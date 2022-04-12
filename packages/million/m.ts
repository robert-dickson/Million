import {
  Delta,
  DeltaTypes,
  DOMNode,
  Flags,
  VElement,
  VElementFlags,
  VEntity,
  VNode,
  VProps,
} from './types';

/**
 * Attaches ns props to svg element
 */
export const svg = (vnode: VElement): VElement => {
  /* istanbul ignore next */
  if (!vnode.props) vnode.props = {};
  ns(vnode.tag, vnode.props, vnode.children);
  return vnode;
};

/**
 * Attaches ns props to an arbitrary element
 */
export const ns = (tag: string, props: VProps, children?: VNode[]): void => {
  if (props.className) {
    props.class = props.className;
    props.className = undefined;
  }
  props.ns = 'http://www.w3.org/2000/svg';
  if (children && tag !== 'foreignObject') {
    for (const child of children) {
      if (typeof child !== 'string' && child.props) ns(child.tag, child.props, child.children);
    }
  }
};

/**
 * Generates a className string based on a classObject
 */
export const className = (classObject: Record<string, boolean>): string =>
  Object.keys(classObject)
    .filter((className) => classObject[className])
    .join(' ');

/**
 * Generates a style string based on a styleObject
 */
export const style = (styleObject: Record<string, string>): string =>
  Object.entries(styleObject)
    .map((style) => style.join(':'))
    .join(';');

/**
 * Converts key names from camelCase to kebab-case
 */
export const kebab = (camelCaseObject: Record<string, unknown>): Record<string, unknown> => {
  const kebabCaseObject = {};
  for (const key in camelCaseObject) {
    kebabCaseObject[key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()] =
      camelCaseObject[key];
  }
  return kebabCaseObject;
};

export const Deltas = {
  CREATE: (i = 0): Delta => [DeltaTypes.CREATE, i],
  UPDATE: (i = 0): Delta => [DeltaTypes.UPDATE, i],
  REMOVE: (i = 0): Delta => [DeltaTypes.REMOVE, i],
};

/**
 * Helper function for constructing entities
 */
export const entity = (
  data: Record<string, unknown>,
  resolve: () => VNode,
  el?: DOMNode,
): VEntity => {
  let key = undefined;
  if (data.key) {
    key = data.key as string | undefined;
    data.key = undefined;
  }
  return {
    flag: Flags.ENTITY,
    data,
    resolve,
    el,
    key,
  };
};

/**
 * Helper method for creating a VNode
 */
export const m = (
  tag: string,
  props?: VProps,
  children?: VNode[],
  flag: VElementFlags = Flags.ELEMENT,
  delta?: Delta[],
): VElement => {
  let key = undefined;
  if (props?.key) {
    key = props.key as string | undefined;
    delete props.key;
  }
  const velement: VElement = {
    tag,
    props,
    children,
    key,
    flag,
    delta,
  };
  return velement.tag.toLowerCase() === 'svg' ? svg(velement) : velement;
};

export const resolveVNode = (entity?: VNode | VEntity): VNode | null | undefined => {
  if (typeof entity === 'object' && entity.flag === Flags.ENTITY) {
    return resolveVNode(entity.resolve());
  }
  return entity;
};
