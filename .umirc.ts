import { defineConfig } from 'umi';

import routes from './config/routes';
import proxy from './config/proxy';
import theme from './config/theme-config';

import * as path from 'path';

// const pxtorem = require('postcss-pxtorem');

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  publicPath: './',
  hash: false,
  history: {
    type: 'hash',
  },
  title: '管家跑腿',
  antd: {},
  dva: {
    hmr: true,
    immer: false,
  },
  // dynamicImport: {
  //   loading: '@/components/PageLoading/index',
  // },
  targets: {
    android: 4,
    ios: 7,
    chrome: 58,
    ie: 9,
  },
  theme: theme,
  define: {
    'process.env.PLATFORM': process.env.PLATFORM,
    'process.env.PLATFORM_ENV': process.env.PLATFORM_ENV,
  },
  extraPostCSSPlugins: [
    // pxtorem({
    //   rootValue: 32,
    //   selectorBlackList: [/^.cbd-index-list/, /^.cbd-searchbox/],
    //   propList: ['*'],
    //   replace: true,
    //   mediaQuery: false,
    //   minPixelValue: 0,
    //   exclude: (file: string) => {
    //     // 排除node_modules中不是antd-mobile
    //     const regx = /.*node_modules\/(?!\bantd-mobile\b\/.*)/i;
    //     file = file.split(path.sep).join('/');

    //     // 排除cbd_mobile中indexList
    //     const regxL = /.*cbd-mobile\/lib\/IndexList\/.*/i;
    //     if (regxL.test(file)) {
    //       return true;
    //     }

    //     return regx.test(file);
    //   },
    // }),
  ],
  alias: {
    'cbd-bridge': path.resolve('./src/bridge/src/lib'),
    'cbd-mobile': path.resolve('./src/common/react-ui/cbd-mobile/lib'),
    'cbd-resource': path.resolve('./src/common/resource'),
  },
  chainWebpack(memo) {
    if (process.env.PLATFORM === 'hybrid') {
      memo.resolve.extensions.merge(['.hybrid.ts', '.hybrid.js']);
    } else if (process.env.PLATFORM === 'minapp') {
      memo.resolve.extensions.merge(['.mina.ts', '.mina.js', '.touch.ts', '.touch.js']);
    } else {
      memo.resolve.extensions.merge(['.touch.ts', '.touch.js']);
    }
  },
  routes,
  proxy,
});
