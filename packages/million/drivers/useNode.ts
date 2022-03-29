import { fromDomNodeToVNode } from '../../shared/convert';
import { createElement } from '../createElement';
import { resolveVNode } from '../m';
import {
  Commit,
  DOMNode,
  Driver,
  Effect,
  EffectTypes,
  Flags,
  OLD_VNODE_FIELD,
  VEntity,
  VNode,
  VTypes,
} from '../types';

/**
 * Diffs a single DOM node and modifies the DOM node based on the necessary changes
 */
export const useNode = (drivers: any[]): any => {
  let isRoot = true;
  const nodeDriver = (
    el: DOMNode,
    newVNode?: VNode | VEntity,
    oldVNode?: VNode | VEntity,
    commit: Commit = (work: () => void) => work(),
    effects: Effect[] = [],
  ): ReturnType<Driver> => {
    // resolved VNode -> stored VNode -> generated VNode
    const resolvedOldVNode: VNode =
      resolveVNode(oldVNode) ?? el[OLD_VNODE_FIELD] ?? fromDomNodeToVNode(el);
    const resolvedNewVNode: VNode = resolveVNode(newVNode)!;

    const finish = (element: DOMNode): ReturnType<Driver> => {
      if (isRoot) {
        isRoot = false;
        effects.push({
          type: EffectTypes.SET_PROP,
          flush: () => (element[OLD_VNODE_FIELD] = resolvedNewVNode),
        });
      }

      return {
        el: element,
        newVNode: resolvedNewVNode,
        oldVNode: resolvedOldVNode,
        effects,
      };
    };

    if (resolvedNewVNode === undefined || resolvedNewVNode === null) {
      effects.push({
        type: EffectTypes.REMOVE,
        flush: () => el.remove(),
      });
      return finish(el);
    } else {
      const hasString =
        typeof resolvedOldVNode === 'string' || typeof resolvedNewVNode === 'string';

      if (hasString && resolvedOldVNode !== resolvedNewVNode) {
        const newEl = createElement(resolvedNewVNode, false);
        effects.push({
          type: EffectTypes.REPLACE,
          flush: () => el.replaceWith(newEl),
        });
        return finish(newEl);
      }
      if (
        !hasString &&
        typeof resolvedOldVNode === 'object' &&
        typeof resolvedNewVNode === 'object'
      ) {
        if (
          resolvedNewVNode.flag === Flags.IGNORE_NODE ||
          resolvedOldVNode.flag === Flags.IGNORE_NODE
        ) {
          return finish(el);
        }
        if (resolvedOldVNode.type === VTypes.ELEMENT && resolvedNewVNode.type === VTypes.ELEMENT) {
          if (
            resolvedNewVNode.flag === Flags.REPLACE_NODE ||
            resolvedOldVNode.flag === Flags.REPLACE_NODE
          ) {
            const newEl = createElement(newVNode);
            el.replaceWith(newEl);
            return finish(el);
          }

          // We handle two cases here:
          // 1. Both keys are undefined so no comparison necessary
          // 2. Keys are not the same
          if (
            (resolvedOldVNode.key === undefined && resolvedNewVNode.key === undefined) ||
            resolvedOldVNode.key !== resolvedNewVNode?.key
          ) {
            if (resolvedOldVNode.tag !== resolvedNewVNode.tag) {
              const newEl = createElement(resolvedNewVNode, false);
              effects.push({
                type: EffectTypes.REPLACE,
                flush: () => el.replaceWith(newEl),
              });
              return finish(newEl);
            }

            for (let i = 0; i < drivers.length; ++i) {
              commit(
                () => {
                  (<Driver>drivers[i])(
                    el,
                    resolvedNewVNode,
                    resolvedOldVNode,
                    commit,
                    effects,
                    nodeDriver,
                  );
                },
                {
                  el,
                  newVNode: resolvedNewVNode,
                  oldVNode: resolvedOldVNode,
                  effects,
                },
              );
            }
          }
        }
      }

      return finish(el);
    }
  };
  return nodeDriver;
};
