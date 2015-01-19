var Promise = require('any-promise');
var hopeful = require('promise-hopeful');
var each = require('amp-each');

module.exports = function (target) {
  if (Array.isArray(target)) {
    return Promise.all(target.map(hopeful)).then(function(values) {
      var hasError = values.some(function(x) { return x instanceof Error; });
      
      if (hasError) return Promise.reject(values);

      return values;
    });  
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

    var hasError = values.some(function(x) { return x instanceof Error; });

    each(keys, function(key) {
      result[key] = values[index ++];
    });

    if (hasError) return Promise.reject(result);

    return result; 
  });
};
