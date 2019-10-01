import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import webpack from 'webpack';

export const common: webpack.Configuration = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'resource-store-redux',
    libraryTarget: 'umd',
  },
  plugins: [new CleanWebpackPlugin()],
};
