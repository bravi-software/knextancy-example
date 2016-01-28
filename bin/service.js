#!/usr/bin/env node
require('http').globalAgent.maxSockets = Infinity;


// enables ES6 support
require('babel-core/register');
require('babel-polyfill');


require('dnscache')({
  enable: true,
  ttl: 5,
  cachesize: 1000,
});


require('../src/')
  .start(require('../config').default);
