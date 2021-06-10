import { createElement } from '../createElement';
import { m, VProps, VNode } from '../m';

const h = (tag: string, props?: VProps, ...children: VNode[]) =>
  m(
    tag,
    props,
    children.length ? children.flat().filter((child) => child !== undefined) : undefined,
  );

describe('.createElement', () => {
  it('should create Text', () => {
    expect(createElement('foo')).toEqual(document.createTextNode('foo'));
  });

  it('should create HTMLElement from vnode', () => {
    expect(createElement(h('div'))).toEqual(document.createElement('div') as HTMLElement);

    const created = createElement(h('div', { id: 'app' }, 'foo'));
    const manual = document.createElement('div') as HTMLElement;
    manual.id = 'app';
    manual.innerHTML = 'foo';

    expect(created).toEqual(manual);
  });
});
