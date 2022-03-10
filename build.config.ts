import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    './packages/million',
    './packages/jsx-runtime',
    './packages/ssr',
    './packages/shared',
    './packages/block',
    './packages/router',
    './packages/html',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
});
