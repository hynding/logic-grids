const path = require('path');
const { experiments } = require('webpack');

module.exports = {
  entry: './src/index.ts',
  experiments: {
    outputModule: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist', 'web'),
    filename: 'bundle.js',
    library: {
      type: "module",
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.webpack.json',
            projectReferences: true,
          },
        },
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};