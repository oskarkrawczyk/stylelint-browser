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
    root: path.resolve(__dirname),
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
    modulesDirectories: [
      "node_modules",
      "site/mocks",
    ]
  },
  module: {
    exprContextCritical: false,
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        // exclude: /node_modules/, without UglifyJsPlugin
        exclude: /(lodash|postcss-sass|gonzales|crypto-browserify)/ // we have to compile a lot of es6 for UglifyJsPlugin
      },
      {
        test: /\.json$/,
        loader: "json-loader",
      },
    ],
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      output: {
        comments: false,
      },
    }),
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
