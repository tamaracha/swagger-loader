'use strict';
const loaderUtils = require('loader-utils');
const CodeGen = require('swagger-js-codegen').CodeGen;

module.exports = function swaggerLoader(source){
  this.cacheable();
  const query = loaderUtils.parseQuery(this.query);
  if(!this.inputValue){
    this.inputValue = JSON.parse(source);
  }
  return CodeGen.getAngularCode({
    swagger: this.inputValue[0],
    className: query.className || 'Api',
    moduleName: query.moduleName || 'api'
  });
};
