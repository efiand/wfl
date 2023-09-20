module.exports = {
  plugins: {
    'stylelint': {},
    'postcss-bem-linter': {},
    'postcss-easy-import': {},
    'postcss-custom-media': {
      importFrom: 'src/css/mq.css'
    },
    'postcss-nested': {},
    'postcss-base64': {
      extensions: ['.png'],
      root: 'src/icons/'
    },
    'postcss-sort-media-queries': {},
    autoprefixer: {},
    cssnano: {},
    'postcss-reporter': {
      clearAllMessages: true,
      throwError: process.env.NODE_ENV !== 'development'
    }
  }
};
