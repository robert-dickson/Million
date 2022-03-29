import {
  COLON_CHAR,
  Commit,
  Driver,
  Effect,
  EffectTypes,
  VElement,
  XLINK_NS,
  XML_NS,
  X_CHAR,
} from '../types';

export const updateProp = (
  el: HTMLElement | SVGElement,
  propName: string,
  oldPropValue: unknown,
  newPropValue: unknown,
  effects: Effect[],
): void => {
  if (oldPropValue === newPropValue) return;
  if (propName.startsWith('on')) {
    const eventPropName = propName.slice(2).toLowerCase();
    effects.push({
      el,
      type: EffectTypes.SET_PROP,
      flush: () => {
        if (oldPropValue) el.removeEventListener(eventPropName, <EventListener>oldPropValue);
        el.addEventListener(eventPropName, <EventListener>newPropValue);
      },
    });
  } else if (propName.charCodeAt(0) === X_CHAR) {
    if (propName.charCodeAt(3) === COLON_CHAR) {
      el.setAttributeNS(XML_NS, propName, String(newPropValue));
    } else if (propName.charCodeAt(5) === COLON_CHAR) {
      el.setAttributeNS(XLINK_NS, propName, String(newPropValue));
    }
  } else if (el[propName] !== undefined && !(el instanceof SVGElement)) {
    if (newPropValue) {
      effects.push({
        el,
        type: EffectTypes.SET_PROP,
        flush: () => (el[propName] = newPropValue),
      });
    } else {
      effects.push({
        el,
        type: EffectTypes.REMOVE_PROP,
        flush: () => {
          el[propName] = '';
          el.removeAttribute(propName);
          delete el[propName];
        },
      });
    }
  } else if (!newPropValue) {
    effects.push({
      el,
      type: EffectTypes.REMOVE_PROP,
      flush: () => el.removeAttribute(propName),
    });
  } else {
    effects.push({
      el,
      type: EffectTypes.SET_PROP,
      flush: () => el.setAttribute(propName, String(newPropValue)),
    });
  }
};

/**
 * Diffs two VNode props and modifies the DOM node based on the necessary changes
 */
export const useProps =
  (drivers: any[] = []): any =>
  (
    el: HTMLElement | SVGElement,
    newVNode: VElement,
    oldVNode?: VElement,
    commit: Commit = (work: () => void) => work(),
    effects: Effect[] = [],
  ): ReturnType<Driver> => {
    const oldProps = oldVNode?.props;
    const newProps = newVNode?.props;
    const data = {
      el,
      newVNode,
      oldVNode,
      effects,
    };
    if (oldProps !== newProps) {
      // Zero props optimization
      if (oldProps === undefined || newProps === null) {
        for (const propName in newProps) {
          updateProp(el, propName, undefined, newProps[propName], effects);
        }
      } else if (newProps === undefined || newProps === null) {
        for (const propName in oldProps) {
          updateProp(el, propName, oldProps[propName], undefined, effects);
        }
      } else {
        let matches = 0;
        for (const propName in oldProps!) {
          updateProp(
            el,
            propName,
            oldProps[propName],
            // Keep track the number of matches with newProps
            Object.prototype.hasOwnProperty.call(newProps, propName)
              ? (matches++, newProps![propName])
              : undefined,
            effects,
          );
        }

        const keys = Object.keys(newProps!);
        // Limit to number of matches to reduce the number of iterations
        for (let i = 0; matches < keys.length && i < keys.length; ++i) {
          const propName = keys[i];
          if (!Object.prototype.hasOwnProperty.call(oldProps, propName)) {
            updateProp(el, propName, undefined, newProps![propName], effects);
            ++matches;
          }
        }
      }
    }
    for (let i = 0; i < drivers.length; ++i) {
      commit(() => {
        (<Driver>drivers[i])(el, newVNode, oldVNode, commit, effects);
      }, data);
    }
    return data;
  };
