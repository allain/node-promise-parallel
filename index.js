var Promise = require('any-promise');
var hopeful = require('promise-hopeful');
var each = require('amp-each');

module.exports = function (target) {
  if (Array.isArray(target)) {
    return Promise.all(target.map(hopeful));  
  }


  var valPromises = []; 
  var keys = [];

  each(target, function(val, key) {
    keys.push(key);
    valPromises.push(hopeful(val));
  });

  return Promise.all(valPromises).then(function(values) {
    var index = 0;
    
    var result = {};

    each(keys, function(key) {
      result[key] = values[index ++];
    });

    return result; 
  });
};
