# promise-parallel

A helper for performing Promises in parallel, does not bail is one of them fails, it resolves it as an error instead

[![build status](https://secure.travis-ci.org/allain/promise-parallel.png)](http://travis-ci.org/allain/promise-parallel)

## Installation

This module is installed via npm:

``` bash
$ npm install promise-parallel
```

## Example Usage

``` js
var parallel = require('promise-parallel');

parallel([
  Promise.resolve(true),
  Promise.reject('baah')
]).then(function(result) {
  console.log(result); //=> true, [Error: baah]
});

parallel({
  a: Promise.resolve(true),
  b: Promise.reject('baah')
}).then(function(result) {
  console.log(result); //=> {a: true, b: [Error: baah]}
});
```
