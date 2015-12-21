'use strict';
const codegen = require('swagger-js-codegen');

module.exports = function swaggerLoader(source){
  this.cacheable();
  console.log(this.inputValues);
  return source;
};
