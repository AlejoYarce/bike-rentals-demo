module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif|otf)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]',
          // Introduced in v3, removes inline font files if enabled
          esModule: false,
          fallback: 'file-loader',

          // Below are the fallback options
          publicPath: '_next/static/fonts',
          outputPath: 'static/fonts',
        },
      },
    })

    return config
  },
}
