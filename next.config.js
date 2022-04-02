const ESLintPlugin = require('eslint-webpack-plugin')
module.exports = {
  future: {
    webpack5: true,
  },
  webpack: (config, { dev }) => {
    if (dev) config.plugins.push(new ESLintPlugin())
    return config
  },
}
