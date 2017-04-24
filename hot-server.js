var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");
var config = require("./webpack.config.hmr.js");
config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");
var compiler = webpack(config);
var server = new webpackDevServer(compiler, {
    hot:true
    //publicPath:config.output.publicPath
    //...

});
server.listen(8080);