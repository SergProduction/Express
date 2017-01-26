const fs = require('fs')
const path = require('path')
const webpack = require('webpack');

const PROD = process.env.NODE_ENV === 'production';

const isFile = name => /\.js$/.test(name)
const nameFile = file => file.match(/\w+(?=\.js$)/g)[0]
const entryFiles = {}

const files = fs.readdirSync('./js/')

files.forEach( file => {
  if( isFile(file) ){
    let name = nameFile(file)
    entryFiles[name] = `./${file}`
  }
  else{
    entryFiles[file] = `./${file}/index.js`
  }
})


const config = module.exports = {
  context: path.resolve(__dirname, './js'),
  entry: entryFiles,
  output: {
    path: 'public/js',
    filename: '[name].js',
    library: '[name]'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /.jsx?$/,
        include: path.resolve(__dirname, './js'),
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-runtime']
        }
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    }),
  ],
  devtool: PROD ? false : 'eval-source-map',
}
//console.log('config',config)