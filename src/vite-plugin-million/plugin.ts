import { parse, print, visit } from 'recast';
import { compile } from './compile';
import { jsxCompat, jsxFactory, jsxFragment, jsxFactoryRaw, JSX_FILTER } from './constants';

export const million = (options?: { importSource?: string; react?: boolean }): any[] => [
  {
    name: 'vite:million-jsx',
    enforce: 'pre',
    config() {
      const importSource = options?.importSource ?? 'million';
      const isReact = options?.react === true;
      const aliasId = `${importSource}/react`;
      const resolveAliases = isReact
        ? {
            alias: {
              react: aliasId,
              'react-dom/client': aliasId,
              'react-dom/server': aliasId,
              'react-dom': aliasId,
            },
          }
        : {};

      const importJSX = `import { h as ${
        isReact ? jsxFactoryRaw : jsxFactory
      }, Fragment as ${jsxFragment} } from '${importSource}/jsx-runtime';\n`;

      return {
        esbuild: {
          jsxFactory,
          jsxFragment,
          jsxInject: isReact
            ? `${importJSX}import { compat as ${jsxCompat} } from '${importSource}/react'; \nlet ${jsxFactory} = ${jsxCompat}(${jsxFactoryRaw});\n`
            : importJSX,
        },
        optimizeDeps: {
          include: ['million', 'million/jsx-runtime'],
        },
        resolve: {
          ...resolveAliases,
          dedupe: ['million'],
        },
      };
    },
  },
  {
    name: 'vite:million-static-vnode',
    async transform(code: string, id: string) {
      if (id.includes('node_modules') || !JSX_FILTER.test(id)) return;

      if (code.includes(`${jsxFactory}(`)) {
        const ast = parse(code);
        const astNodes: any[] = [];

        visit(ast, {
          visitCallExpression(path) {
            if (path.value.callee.name === jsxFactory) {
              astNodes.push(path);
            }
            this.traverse(path);
          },
        });

        for (let i = 0; i < astNodes.length; i++) {
          astNodes[i].replace(compile(astNodes[i].value));
        }

        const result = print(ast);

        return { code: result.code, map: result.map };
      } else {
        return { code };
      }
    },
  },
];
