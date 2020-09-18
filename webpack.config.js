const path = require('path')

module.exports = {
    entry: './src/smoothie.js',
    output: {
        filename: 'smoothie.min.js',
        path: path.resolve(__dirname, 'dist')
    }
}