const webpack = require('webpack')

module.exports = {
    webpack: {
        plugins: {
            add: [
                new webpack.ProvidePlugin({
                    Buffer: ['buffer', 'Buffer'],
                }),
            ],
	    },
	    configure: {
	        resolve: {
                // https://github.com/Web3Modal/web3modal/issues/317#issuecomment-1046001652
                fallback: {
                    stream: require.resolve('stream-browserify'),
                    https: require.resolve('https-browserify'),
                    os: require.resolve('os-browserify/browser'),
                    http: require.resolve('stream-http'),
                    buffer: require.resolve('buffer'),
                },
	        },
            ignoreWarnings: [
                function ignoreSourcemapsloaderWarnings(warning) {
                  return (
                    warning.module &&
                    warning.module.resource.includes("node_modules") &&
                    warning.details &&
                    warning.details.includes("source-map-loader")
                  );
                },
            ]
	    },
    },
}
