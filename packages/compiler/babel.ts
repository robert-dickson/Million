import { declare } from '@babel/helper-plugin-utils';
import { optimize } from './optimize';
import { transformReact } from './react';

export default declare((api, options) => {
  api.assertVersion(7);
  return {
    name: 'million',
    visitor: {
      CallExpression: options.mode === 'optimize' ? optimize : transformReact,
    },
  };
});
