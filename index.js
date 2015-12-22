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
      const options = {};
      options.swagger = obj;
      options.className = query.className || 'Api';
      options.moduleName = query.moduleName || 'api';
      if(query.esnext){options.esnext = query.esnext;}
      if(query.lint){options.lint = query.lint;}
      if(query.beautify){options.beautify = query.beautify;}
      if(query.type === 'custom'){
        options.template = query.template;
      }
      let fn;
      switch(query.type){
        case 'angular':
          fn = 'getAngularCode';
          break;
        case 'node':
          fn = 'getNodeCode';
          break;
        case 'custom':
          fn = 'getCustomCode';
          break;
        default:
          fn = 'getCustomCode';
      }
      const code = CodeGen[fn](options);
      return callback(null,code);
    },
    (e) => {
      return callback(e);
    }
  );
};
