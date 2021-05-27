const path = require('path');


function excludeExtension(config, extension) {
  const index1 = config.module.rules.findIndex((rule) => typeof (rule.oneOf) !== 'undefined');
  config.module.rules[index1].oneOf = config.module.rules[index1].oneOf.filter((rule) => !rule.test || rule.test.toString().indexOf(extension) === -1);

  const index2 = config.module.rules[index1].oneOf.findIndex((rule) => rule.loader && typeof rule.loader === 'string' && rule.loader.indexOf(`${path.sep}file-loader${path.sep}`) !== -1);
  config.module.rules[index1].oneOf[index2].exclude.push(extension);

  return config;
}


module.exports = function override(config, env) {

  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: "javascript/auto"
  });

  const wasmExtensionRegExp = /\.wasm$/;

  // config.resolve.extensions.push('.wasm');
  // make the file loader ignore wasm files
  let fileLoader = null;
  config.module.rules.forEach(rule => {
    (rule.oneOf || []).map(oneOf => {
      if (oneOf.loader && oneOf.loader.indexOf('file-loader') >= 0) {
        fileLoader = oneOf;
      }
    });
  });
  fileLoader.exclude.push(wasmExtensionRegExp);

  // Add a dedicated loader for them
  config.module.rules.push({
    test: wasmExtensionRegExp,
    include: path.resolve(__dirname, 'src'),
    use: [{ loader: require.resolve('wasm-loader'), options: {} }],
  });
  return config;
};
