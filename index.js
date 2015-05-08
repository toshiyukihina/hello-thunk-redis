'use strict';

var redis = require('thunk-redis'),
    Promise = require('bluebird');

var argv = require('yargs')
      .usage('node $0 -t <test>')
      .option('t', {
        alias: 'test',
        demand: true,
        describe: 'A test function name',
        type: 'string'
      })
      .epilog('Copyright 2015')
      .argv;

var testClusterMode = function() {
  [true, false].forEach(function(clusterMode) {
    var client = redis.createClient(7000, {clusterMode: clusterMode});
    client.on('connect', function() {
      console.log('* clusterMode=%s', clusterMode);
      console.dir(client.clientState());
      client.clientEnd();
    });
  });
};

var testGetSet = function() {
  var options = {
    usePromise: Promise,
    clusterMode: false,
    database: 100,
    debug: true
  };

  var client = redis.createClient(7000, options);

  client.on('connect', function() {
    console.dir(client.clientState());

    client.set('key1', 100).then(function(res) {
      console.log('SET key1 => %s', res);
      return client.get('key1');
    }).then(function(res) {
      console.log('GET key1 => %s', res);
      return client.set('key2', 200);
    }).then(function(res) {
      console.log('SET key2 => %s', res);
      return client.get('key2');
    }).then(function(res) {
      console.log('GET key2 => %s', res);
      return client.mget(['key1', 'key2']);
    }).then(function(res) {
      console.log('MGET key1 key2 => %s', res);
    }).catch(function(e) {
      console.error(e);
    }).finally(function() {
      console.log('DONE!');
      client.clientEnd();
    });
  });
};

(function() {
  console.log('>>> %s', argv.t);
  eval(argv.t)();
})();
