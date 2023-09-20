const nunjucks = require('nunjucks');
const render = require('posthtml-render');
const parser = require('posthtml-parser');
const manageEnv = require('./nunjucks.config.cjs');
const getData = require('./src/data/index.cjs');

module.exports = () => ({
  plugins: [
    (() => async (tree) => {
      const page = tree.options.from.replace(/^.*pages(\\+|\/+)(.*)\.njk$/, '$2');
      const data = await getData(page);

      manageEnv(nunjucks.configure('src', { autoescape: false }));

      return parser(nunjucks.renderString(render(tree), data));
    })(),
    require('htmlnano')({ collapseWhitespace: 'aggressive' })
  ]
});
