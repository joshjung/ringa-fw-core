const webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.resolve(process.env.PWD);

require('babel-polyfill');

module.exports = {
  name: 'ringa-fw-core',
  node: {
    module: "empty",
    fs: "empty"
  },
  entry: {
    app: path.resolve(ROOT_PATH, 'src/index.js')
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom',
    },
    ringa: {
      root: 'Ringa',
      commonjs2: 'ringa',
      commonjs: 'ringa',
      amd: 'ringa',
      umd: 'ringa',
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0', 'react'],
            compact: false
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  output: {
    path: path.join(ROOT_PATH, 'dist'),
    filename: 'ringa-fw-core.min.js',
    publicPath: '/',
    library: 'Ringa Framework Core',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: {
        except: [
          '$controller',
          '$thread',
          '$ringaEvent',
          'event',
          '$customEvent',
          '$lastEvent',
          '$target',
          '$detail',
          'done',
          'fail',
          '$lastPromiseResult',
          '$lastPromiseError',
          'Command',
          'EventExecutor',
          'FunctionExecutor',
          'IifExecutor',
          'ParallelExecutor',
          'PromiseExecutor',
          'SleepExecutor',
          'SpawnExecutor',
          'Bus',
          'Controller',
          'ExecutorAbstract',
          'Model',
          'ModelWatcher',
          'RingaEvent',
          'RingaEventFactory',
          'RingaHashArray',
          'RingaObject',
          'Thread',
          'ThreadFactory',
          'InspectorModel',
          'inspectorModel',
          'InspectorController',
          'inspectorController',
          'thread']
      }
    })
  ]
};
