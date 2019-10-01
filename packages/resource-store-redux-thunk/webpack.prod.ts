import { common } from './webpack.common';
import merge from 'webpack-merge';

module.exports = merge(common, {
  mode: 'production',
});
