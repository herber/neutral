import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import buble from 'rollup-plugin-buble';
import pkg from './package.json';

const ENTRY = pkg.source;

export default [
  // browser-friendly UMD build
  {
    input: ENTRY,
    output: {
      name: 'neutral',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      resolve({
        preferBuiltins: true
      }), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      builtins(),
      buble({ transforms: { templateString: false } })
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: ENTRY,
    external: Object.keys(pkg.dependencies),
    output: [{ file: pkg.main, format: 'cjs' }, { file: pkg.module, format: 'es' }],
    plugins: [buble({ transforms: { templateString: false } })]
  }
];
