var assert = require('assert');
var parallel = require('..');
var Promise = require('any-promise');

describe('promise-parallel', function() {
  it('resolves a simple array with no errors', function(done) {
    parallel([
      Promise.resolve(true),
      true,
      false
    ]).then(function(result) {
      assert.deepEqual(result, [true, true, false]);
      done();
    }, done); 
  });
  
  it('resolves a simple array with e rejection in it', function(done) {
    parallel([
      Promise.reject('baaah'),
      true,
      false
    ]).then(function(result) {
      assert(result[0] instanceof Error);
      assert.equal(result[0].message, 'baaah');
      assert.equal(result[1], true);
      assert.equal(result[2], false);
      done();
    }, done); 
  });
  
  it('resolves a simple hash with no errors', function(done) {
    parallel({
      a: Promise.resolve(true),
      b: true,
      c: false
    }).then(function(result) {
      assert.deepEqual(result, {a: true, b: true, c: false});
      done();
    }, done); 
  });

  it('resolves a simple hash with an error in it', function(done) {
    parallel({
      a: Promise.reject(new Error('a')),
      b: Promise.reject('baah'),
      c: Promise.reject(),
      d: false
    }).then(function(result) {
      assert(result.a instanceof Error);
      assert(result.b instanceof Error);
      assert(result.c instanceof Error);
      assert.equal(result.a.message, 'a');
      assert.equal(result.b.message, 'baah');
      assert.equal(result.c.message, '');
      assert.equal(result.d, false);
      done();
    }, done); 
  });
});
