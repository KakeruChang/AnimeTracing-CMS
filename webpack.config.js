const path = require('path')
const webpack = require('webpack')

module.exports = {
  // entry: './src/index.js',
  entry: ['@babel/polyfill', './src/index.tsx'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist/')
  },
  resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
  devServer: {
    contentBase: './dist',
    port: 3000
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/typescript', '@babel/preset-env']
          }
        }
      },
      {
        test: /.tsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/typescript',
              '@babel/preset-react',
              '@babel/preset-env'
            ]
          }
        }
      }
    ]
  }
}
