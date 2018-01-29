module.exports = {
    entry: {
        main: './src/app.js'
    },
    output: {
        filename: './dist/scripts/combined.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}