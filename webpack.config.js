import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import webpack from 'webpack'
import { configDotenv } from 'dotenv'
import { fileURLToPath } from 'url'

configDotenv()

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const getConfiguration = async (_env, argv) => {
  const mode = argv.mode || process.env.NODE_ENV || 'development'

  return {
    mode,
    target: 'web',
    entry: {
      background: path.resolve(__dirname, 'src', 'index.js'),
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build'),
    },
    resolve: {
      extensions: ['.css', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
      ],
    },
    devServer: {
      liveReload: true,
      port: 8888,
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
      new MiniCssExtractPlugin({
        filename: 'bundle.css',
      }),
    ],
  }
}

export default getConfiguration
