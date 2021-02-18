// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from 'D:/private/test/umi-demo/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": require('@/pages').default,
    "exact": true
  },
  {
    "path": "/test",
    "component": require('@/pages/test1.tsx').default,
    "exact": true
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
