const path = require('path')
const sassResourcesLoader = require('craco-sass-resources-loader')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  babel: {
    presets: [
      '@babel/preset-env',
    ],
    plugins: [
      'lodash',
      'babel-plugin-styled-components',
      "react-activation/babel",
      [
        'import',
        {
          libraryName: "antd",
          libraryDirectory: "es",
          // wait till craco-less fix the problem see: https://github.com/DocSpring/craco-less/issues/51
          style: 'css',
        },
      ]
    ]
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@scss': path.resolve(__dirname, 'src/assets/scss'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
      '@js': path.resolve(__dirname, 'src/assets/js'),
      '@styled': path.resolve(__dirname, 'src/globalStyled'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@containers': path.resolve(__dirname, 'src/containers'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@redux': path.resolve(__dirname, 'src/redux'),
    },
    plugins: [
      new LodashModuleReplacementPlugin(),
      // process.env.NODE_ENV === 'development' &&
      // new BundleAnalyzerPlugin()
    ].filter(Boolean),
  },
  plugins: [
    {
      plugin: sassResourcesLoader,
      options: {
        resources: [
          './src/assets/scss/_variables.scss',
          './src/assets/scss/_mixins.scss',
        ],
      },
    },
  ]
}
