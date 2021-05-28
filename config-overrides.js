const path = require('path');

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
