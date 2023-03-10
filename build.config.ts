import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    './packages/million',
    './packages/react',
    './packages/jsx-runtime',
    './packages/compiler',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: false,
  },
  externals: [
    'react',
    'react-dom',
    'unplugin',
    '@babel/core',
    '@babel/types',
    'vite',
    'esbuild',
  ],
});
