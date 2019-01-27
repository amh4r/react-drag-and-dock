const webpack = require('webpack');

module.exports = {
  output: {
    library: 'DragAndDock',
    libraryExport: 'default',
    libraryTarget: 'umd',
    // globalObject: "(typeof window !== 'undefined' ? window : this)",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM',
    },
  },
  plugins: [new webpack.optimize.ModuleConcatenationPlugin()],
};
