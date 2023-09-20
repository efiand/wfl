import TerserPlugin from 'terser-webpack-plugin';

export default {
  mode: process.env.NODE_ENV,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          format: {
            comments: false
          }
        },
        extractComments: false
      })
    ]
  },
  output: {
    filename: '[name].min.js'
  }
};
