const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const path = require("path");

/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[hash].js",
  },
  devServer: {
    compress: true,
    port: 8080,
    hot: true,
    static: "./dist",
    historyApiFallback: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.wasm$/,
        loaders: ["wasm-loader"],
        // type: "asset",
      },
    ],
  },
  plugins: [
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, "."),
    }),
  ],
  mode: "development",
  devtool: "inline-source-map",
  experiments: {
    asyncWebAssembly: true,
  },
  resolve: {
    extensions: [".tsx", ".jsx", ".ts", ".js", ".json", ".d.ts", ".wasm"],
  },
  builtins: {
    html: [
      {
        template: __dirname + "/public/index.html",
        filename: "index.html",
      },
    ],
  },
};
