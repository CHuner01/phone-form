import path from 'path';
import TerserPlugin from "terser-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import type { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import tsConfig from "./tsconfig.json";

interface WebpackConfig extends Configuration {
    devServer?: DevServerConfiguration;
}

const SRC_PATH = path.resolve(__dirname, 'src');

const { NODE_ENV = '' } = process.env;

const IS_PROD = NODE_ENV === 'production';

const config: WebpackConfig = {
    entry: path.resolve(SRC_PATH, 'main.tsx'),
    target: 'web',
    mode: IS_PROD ? 'production' : 'development',
    module: {
        rules: [
            { test:  /\.s[ac]ss$/i, use: [ 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader' ] },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\\.(js|jsx|ts|tsx)$/i,
                exclude: /node_modules/,
                use: 'babel-loader',
            },

        ],
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: Object.fromEntries(
            Object.keys(tsConfig.compilerOptions.paths)
                .map((alias) => alias.replace('/*', ''))
                .map((alias) => [alias, path.join(SRC_PATH, alias)])
        ),
    },
    optimization: {
        minimize: IS_PROD,
        minimizer: IS_PROD ? [new TerserPlugin()] : [],
    },
    devtool: IS_PROD ? 'source-map' : 'eval-source-map',
    devServer: {
        hot: true,
        historyApiFallback: true,
    }
}

export default config;