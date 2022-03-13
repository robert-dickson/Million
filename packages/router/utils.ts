export const setAttribute = (el: Element, attr: string, base: string | URL) => {
  el.setAttribute(attr, new URL(el.getAttribute(attr)!, base).pathname);
};

export const normalizeRelativeURLs = (el: Element | Document, base: string | URL) => {
  const hrefs = el.querySelectorAll('[href^="./"], [href^="../"]');
  const srcs = el.querySelectorAll('[src^="./"], [src^="../"]');
  for (let i = 0; i < hrefs.length; i++) {
    setAttribute(hrefs[i], 'href', base);
  }
  for (let i = 0; i < srcs.length; i++) {
    setAttribute(srcs[i], 'src', base);
  }
};

export const isLocalURL = (href: string) => {
  try {
    const url = new URL(href);
    if (window.location.origin === url.origin) {
      if (url.pathname === window.location.pathname) {
        return !url.hash;
      }
      return true;
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}
  return false;
};

export const getURL = ({ target }: Event): URL | undefined => {
  const a = (<HTMLElement>target).closest('a');
  if (!a || !isLocalURL(a.href)) return undefined;
  else return new URL(a.href);
};
