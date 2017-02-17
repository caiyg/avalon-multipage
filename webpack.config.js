var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //将组件中的样式乖乖提取出来
var HtmlWebpackPlugin = require('html-webpack-plugin'); //html模板插入代码


//webpck插件
var plugins = [
  //提公用js到common.js文件中
  // new webpack.optimize.CommonsChunkPlugin('common.js'),
  new webpack.optimize.CommonsChunkPlugin({
    name:["vendor"]
  }),
  new HtmlWebpackPlugin({
    // title: "电视台",
    template: "tpl.html",
    filename: "index.html",
    hash: true
  }),
  //将样式统一发布到style.css中
  new ExtractTextPlugin("style.css", {
    allChunks: true,
    disable: false
  }),
  // ,
  // // 使用 ProvidePlugin 加载使用率高的依赖库
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery",
    "avalon": "avalon2",
    "window.avalon": "avalon2",
    "_": "lodash"
  })
];

var entry = {
  home:'./src/views/home/main.js',
  vendor:['avalon2','jquery','mmRouter','lodash'],
},
  // buildPath = "./../JAVA_APP/cn.com.ava.education.maven/cn.com.ava.education.web/src/main/webapp/"
  // buildPath = "./../../JAVA_APP/cn.com.ava.university.maven/cn.com.ava.university.web/src/main/webapp/";
  //buildPath = "./../ava_app/educatin/apache-tomcat-7.0.54/webapps/ROOT/"
  // buildPath = "./../../JAVA_APP/cn.com.ava.school.maven/cn.com.ava.school.web/target/cn.com.ava.school.web/";
  // buildPath = "/../../workspace_STS/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/cn.com.ava.school.web/";
  // buildPath = "./../JAVA_APP/cn.com.ava.zdkt.maven/cn.com.ava.zdkt.web/src/main/webapp/"
  buildPath = "/dist";
//编译输出路径
module.exports = {
  debug: true,
  entry:entry,
  output: {
    path: __dirname + buildPath,
    // filename: 'build.js',
    filename: '[name].js',
    publicPath: '',
    chunkFilename: "[name].chunk.[chunkhash:8].js" //给require.ensure用
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(
        "style-loader", "css-loader?sourceMap!postcss-loader")
    }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap&root=src/assets/css!less-loader?sourceMap')
    }, {
      test: /\.(jpg|png|gif)$/,
      loader: "file-loader?name=images/[name].[hash].[ext]"
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&minetype=application/font-woff"
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader"
    }, {
      test: /\.json$/,
      loader: "json"
    }, {
      test: /\.coffee$/,
      loader: "coffee-loader"
    }, {
      test: /\.(coffee\.md|litcoffee)$/,
      loader: "coffee-loader?literate"
    }],
    preLoaders: [{
      test: /\.js$/,
      loader: "require-css-preloader"
    }]
  },
  externals:{
      // jQuery: "jquery/jquery",
      // $: "jquery",
      // jQuery: "jquery"
  },
  resolve: {

    root: path.resolve('src'),

    // require时省略的扩展名，如：require('module') 不需要module.js
    extension: ['', '.js', '.css','.less',".coffee","json"],
    alias:{
    	avalon2: path.join(__dirname, "src/assets/avalon/avalon.js"),
        mmRouter: path.join(__dirname, "src/assets/avalon/mmRouter.js"),
    }
  },
  plugins: plugins,
  // devtool: '#source-map'
  devtool: '#source-map',
  	// server pack的代码，热更新自动刷新浏览器
	// 需先安装 npm install webpack-dev-server --save-dev
	// 然后在package.json配置运行命令
	// "scripts": {
	//   "start": "webpack-dev-server --hot --inline"
	// }
	// 可以通过 npm start 启动
  devServer:{
	historyApiFallback:true,
	hot:true,
	inline:true,
	progress:true
  }
};