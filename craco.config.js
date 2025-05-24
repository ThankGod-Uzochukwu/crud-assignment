// craco.config.js
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Allow webpack to resolve .mjs in node_modules
      webpackConfig.resolve.extensions.push('.mjs');
      webpackConfig.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      });
      return webpackConfig;
    },
  },
};
