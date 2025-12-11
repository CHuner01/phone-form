import path from 'path';

const SRC_PATH = path.resolve(__dirname, 'src');

const { NODE_ENV = '' } = process.env;

const IS_PROD = NODE_ENV === 'production';

import TerserPlugin from "terser-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

module.exports = {
    entry: './src/index.ts',
    target: 'web',
    module: {
        rules: [
            { test:  /\.s[ac]ss$/i, use: [ 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader' ] },
            {
                test: /\\.(js|jsx|ts|tsx)$/i,
                exclude: /node_modules/,
                use: 'babel-loader',
            }
        ],
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    optimization: {
        minimize: IS_PROD,
        minimizer: IS_PROD ? [new TerserPlugin()] : [],
    },
    devtool: IS_PROD ? 'source-map' : 'eval-source-map',
}