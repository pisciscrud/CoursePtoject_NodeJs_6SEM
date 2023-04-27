const webpack = require('webpack');

module.exports = function override (config, env) {
    console.log('override')
    let loaders = config.resolve
    loaders.fallback = {
        "fs": false,
        "tls": false,
        "net": false,
        "stream-http":false,
        "http": require.resolve("stream-http"),
        "https": false,
        "zlib": false ,
        "path": false,
        "stream": require.resolve("stream-browserify"),
        "util": require.resolve("util/"),
        "crypto": require.resolve("crypto-browserify")
    }
    config.plugins.push(
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                //MY_ENV_VAR: JSON.stringify("my-value")
            }
        })
    );

    return config
}