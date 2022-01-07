const params = {
  floatPrecision: 2
};

export default {
  plugins: [
    {
      name: 'removeViewBox',
      active: false
    },
    {
      name: 'removeTitle',
      active: true
    },
    {
      name: 'cleanupNumericValues',
      params
    },
    {
      name: 'convertPathData',
      params
    },
    {
      name: 'convertTransform',
      params
    },
    {
      name: 'cleanupListOfValues',
      params
    }
  ]
};
