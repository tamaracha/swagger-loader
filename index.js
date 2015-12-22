'use strict';
const loaderUtils = require('loader-utils');
const parser = require('swagger-parser');
const CodeGen = require('swagger-js-codegen').CodeGen;

module.exports = function swaggerLoader(source){
  this.cacheable();
  let callback = this.async();
  const query = loaderUtils.parseQuery(this.query);
  parser.validate(this.inputValue[0])
  .then(
    (obj) => {
      const code = CodeGen.getAngularCode({
        swagger: obj,
        className: query.className || 'Api',
        moduleName: query.moduleName || 'api',
        esnext: query.esnext ? true : false
      });
      return callback(null,code);
    },
    (e) => {
      return callback(e);
    }
  );
};
