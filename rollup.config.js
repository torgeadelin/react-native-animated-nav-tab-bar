import typescript from '@rollup/plugin-typescript'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'

import pkg from './package.json'

/* exported rollup configuration */
const config = {
  input: 'index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: "named"
    },
    {
      file: pkg.module,
      format: 'es',
      exports: "named"
    },
  ],
  plugins: [
    external({ includeDependencies: true }),
    resolve(),
    typescript(),
  ],
  external: ['react', 'react-native']
  
};

export default config;