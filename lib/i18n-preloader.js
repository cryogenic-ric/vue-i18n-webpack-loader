var fs = require('fs');
var loaderUtils = require('loader-utils');

module.exports = function (content) {
  var options = loaderUtils.getOptions(this);
  const translationRE = /_\(['`"]([A-Za-z\d@$&%!'.\-\{\}\(\)\,\;" ]+)['`"]\)+/g;
  var langJsonData = {};

  if (options.file && fs.existsSync(options.file)) {
    langJsonData = JSON.parse(fs.readFileSync(options.file, 'utf8'));
  }

  function replacer (match, keyword) {
    if (langJsonData.hasOwnProperty(keyword)) {
      return langJsonData[keyword];
    } else {
      return keyword;
    }
  }
  var newContent = content.replace(translationRE, replacer);
  return newContent;
};
