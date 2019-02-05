import webpack from "webpack"
import path from "path"

export default {
  entry: "./site/index.js",
  output: {
    path: path.resolve(__dirname, "site"),
    publicPath: "/",
    filename: "bundle.js",
  },
  resolve: {
    // root: path.resolve(__dirname),
    alias: {
      "resolve-from": "empty-module",
      cosmiconfig: "cosmiconfig-module",
      doiuse: "empty-module",
      globby: "empty-module",
      globjoin: "empty-module",
      multimatch: "empty-module",
      path: "path-module",
      "global-modules": "empty-module",
      fs: "fs-module"
    },
    modules: [
      "node_modules",
      "site/mocks",
    ]
  },
  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/, // without UglifyJsPlugin
        // exclude: /(lodash|postcss-sass|gonzales|crypto-browserify)/ // we have to compile a lot of es6 for UglifyJsPlugin
      }
    ],
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /requireRule\.js/,
      path.resolve(__dirname, "site/mocks/require-rule.js"),
    ),
    new webpack.NormalModuleReplacementPlugin(
      /\.\/dynamicRequire/,
      path.resolve(__dirname, "site/mocks/empty-module.js"),
    ),
    // stylelint's postcssPlugin dynamically requires stylelint plugins which
    // are not used in the browser. Tell Webpack to ignore them with the
    // ContextReplacementPlugin. See https://github.com/webpack/webpack/issues/198
    new webpack.ContextReplacementPlugin(/postcss-syntax/, /NEVER_MATCH^/),
  ],
  node: {
    fs: "empty",
    module: "empty",
  },
}
