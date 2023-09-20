const WithExtension = require('@allmarkedup/nunjucks-with');

const dayjs = require('dayjs');
dayjs.extend(require('dayjs/plugin/duration'));

module.exports = (env) => {
  env.addExtension('WithExtension', new WithExtension());

  env.addFilter('keys', (obj) => Object.keys(obj));

  env.addFilter('minsec', (seconds = 0) => dayjs.duration(seconds * 1000).format('mm:ss'));

  env.addFilter('datefmt', (dateStr) => dayjs(dateStr).format('MMM DD YYYY'));

  env.addFilter('setProp', (obj, key, value) => {
    obj[key] = value;
    return obj;
  });

  env.addFilter('dropExt', (filename) => filename.slice(0, filename.lastIndexOf('.')));
};
