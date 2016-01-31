import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
//import ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as config from './webpack.config.babel';

const { log, error } = console;
const PORT = 8080;
const HOST = 'localhost';
const HOST_URI = `http://${HOST}:${PORT}`;

const babelLoader = Object.assign({}, config.babelLoader);
babelLoader.query = {
    "env": {
      "development": {
        "plugins": [
          ["react-transform", {
            "transforms": [{
              "transform": "react-transform-hmr",
              "imports": ["react"],
              "locals": ["module"]
            }]
          }]
        ]
      }
    }
};

const devConfig = Object.assign({}, config.CLIENT, {
  name: 'dev-server',
  entry: [
    'webpack/hot/only-dev-server',
    //'webpack-hot-middleware/client',
    `webpack-dev-server/client?${HOST_URI}`
  ].concat(config.CLIENT.entry),
  module: {
     loaders: [
      babelLoader,
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      }
    ]
  },
  output: Object.assign({}, config.CLIENT.output, {
    publicPath: `${HOST_URI}/`
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ].concat(config.CLIENT.plugins)
});

const statOptions = {
  colors: true,
  hash: false,
  timings: false,
  chunks: false,
  chunkModules: false,
  modules: false,
  children: true,
  version: true,
  cached: false,
  cachedAssets: false,
  reasons: false,
  source: false,
  errorDetails: false
};

const devServer = new WebpackDevServer(webpack(devConfig), {
  hot: true,
  //inline: true,
  stats: statOptions
});

devServer.listen(PORT, HOST, function (err) {
  if (err) throw err;
  log(`Webpack dev server listening at ${HOST_URI}`);
});

webpack(config.SERVER).watch({}, (err, stats) => {
  if (err) return error(err.message);
  log(stats.toString(statOptions));
});
