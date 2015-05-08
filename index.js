'use strict';

var redis = require('thunk-redis'),
    Promise = require('bluebird');

// var argv = require('yargs')
//       .usage('Usage: $0 -x [num] -y [num]')
//       .demand(['x', 'y'])
//       .alias('x', 'xxxxx')
//       .alias('y', 'yyyyy')
//       .epilog('Copyright 2015')
//       .argv;

// console.log('(%d, %d)', argv.x, argv.y);
// console.log(argv._);

// process.exit(0);

var options = {
  database: 2,
  usePromise: Promise,
  debug: true
};

var nodes = [
  { host: '127.0.0.1', port: 6379 }
];

var client = redis.createClient(nodes, options);

var testGetSet = function() {
  client.on('connect', function() {
    console.log('Connected!');
    client.quit();
  });
};

testGetSet();

// client.on('connect', function() {
//   console.log('Connected!');

//   client.info().then(function(res) {
//     console.log('* server info: %s', JSON.stringify(res));
//     return client.dbsize();
//   }).then(function(res) {
//     console.log('* current database size: %s', res);
//     return client.select(0);
//   }).then(function(res) {
//     console.log('* selected database 0: %s', res);
//     return Promise.all([
//       client.multi(),
//       client.set('key', 'redis'),
//       client.get('key'),
//       client.exec()
//     ]);
//   }).then(function(res) {
//     console.log('* transactions: %s', res);
//     return client.quit();
//   }).then(function(res) {
//     console.log('* redis client quit: %s', res);
//   }).catch(function(e) {
//     console.error(e);
//   }).finally(function() {
//     client.clientEnd();
//   });
// });
