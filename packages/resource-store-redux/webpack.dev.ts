import { common } from './webpack.common';
import merge from 'webpack-merge';

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: [
      'node_modules',
      'dist/**/*.js',
    ],
  },
});
