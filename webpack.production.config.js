var webpack = require('webpack');

module.exports = {
  entry: {
    app: "./src/js/entry.js"
  },
  output: {
    path: './dist/js',
    publicPath: '/js/',
    filename: "[name].js"
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      }
    ],
    loaders: [
      {
        test: /\.sass$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.sass', '.css']
  },
  eslint: {
    configFile: './.eslintrc'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(), // 重複したファイルを除去
    new webpack.optimize.OccurenceOrderPlugin(), // コンパイルするファイルの順番を調整
    new webpack.optimize.UglifyJsPlugin({ // Uglify
      mangle: true, // ローカル変数名を短い名称に変更する
      sourcemap: false,
      compress: {
        unused: false,
        conditionals: false,
        dead_code: false,
        side_effects: false
      }
    }),
    new webpack.ProgressPlugin((percentage, msg) => {
      process.stdout.write('progress ' + Math.floor(percentage * 100) + '% ' + msg + '\r');
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};