const path = require('path')

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/smoothie.js',
    output: {
        filename: 'smoothie.min.js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            terserOptions: {
                keep_classnames: true
            }
        })],
    },
}