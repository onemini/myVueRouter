const path = require('path')

const flow = require('rollup-plugin-flow-no-whitespace')
const cjs = require('rollup-plugin-commonjs')
const node = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')
const version = require('../package.json').version
const banner =
`/*!
  * vue-router v${version}
  * (c) ${new Date().getFullYear()} Evan You
  * @license MIT
  */`

const resolve = _path => path.resolve(__dirname, '../', _path)

module.exports = [
    // browser dev
    {
      file: resolve('dist/vue-router.js'),
      format: 'umd',
      env: 'development'
    },
].map(genConfig)

function genConfig (opts) {
    const config = {
        input: {
          input: resolve('src/index.js'),
          plugins: [
            flow(),
            node(),
            cjs(),
            replace({
              __VERSION__: version
            })
          ]
        },
        output: {
          file: opts.file,
          format: opts.format,
          banner,
          name: 'VueRouter'
        }
      }

      return config

}