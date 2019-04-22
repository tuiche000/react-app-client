const path = require('path')
const {
  override,
  fixBabelImports,
  addWebpackAlias,
  useBabelRc
} = require("customize-cra");

module.exports = override(
  fixBabelImports("babel-plugin-import", {
    libraryName: "antd-mobile",
    style: "css",
  }),
  addWebpackAlias({
    ["@"]: path.resolve(__dirname, "src/")
  }),
  useBabelRc()
);