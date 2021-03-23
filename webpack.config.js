const path = require('path');

module.exports = {
    entry: './src/ts/loadingScreen.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'loadingScreen.js',
        path: path.resolve(__dirname, 'src/js'),
    },
};