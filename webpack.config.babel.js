import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export const CLIENT_DIR = path.resolve(__dirname, 'client');
export const SERVER_DIR = path.resolve(__dirname, 'server/generated'); // 'server/generated'
export const DIST_DIR = path.resolve(__dirname, 'dist');
// export const SERVER_DIST_DIR = path.resolve(__dirname, 'dist');

export const babelLoader = {
  test: /\.jsx?$/,
  include: CLIENT_DIR,
  loader: 'babel-loader'
};

export const cssLoader = {
  test: /\.less$/,
  loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
};

export const aliases = {
  components: path.resolve(CLIENT_DIR, 'components'),
  stores: path.resolve(CLIENT_DIR, 'stores'),
  dispatcher: path.resolve(CLIENT_DIR, 'dispatcher')
  //server: path.resolve(SERVER_DIR)
  //reducers: path.resolve(CLIENT_DIR, 'reducers'),
  //actions: path.resolve(CLIENT_DIR, 'actions')
};

export const CLIENT = {
  name: 'client',
  target: 'web',
  context: CLIENT_DIR,
  entry: './index.js',
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [babelLoader, cssLoader]
  },
  resolve: {
    alias: aliases,
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new ExtractTextPlugin('bundle.css', {allChunks: true})
  ]
};

export const SERVER = {
  name: 'server',
  target: 'node',
  context: CLIENT_DIR,
  entry: {
    app: 'components/app/index.js'
  },
  output: {
    path: SERVER_DIR,
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  externals: /^[a-z\-0-9]+$/,
  module: {
    loaders: [babelLoader, cssLoader]
  },
  resolve: {
    alias: aliases,
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
};

export default [CLIENT, SERVER];
