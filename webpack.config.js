const webpack = require('webpack');
const WebpackModules = require('webpack-modules');
const path = require('path');
const config = require('sapper/config/webpack.js');
const pkg = require('./package.json');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';



const alias = {
	svelte: path.resolve('node_modules', 'svelte'),
	'src': path.resolve(__dirname, 'src'),
};
const extensions = ['.mjs', '.js', '.json', '.svelte', '.html'];
const mainFields = ['svelte', 'module', 'browser', 'main'];
const magicImporter = require('node-sass-magic-importer');
const sveltePreprocess = require('svelte-preprocess');

module.exports = {
	client: {
		entry: config.client.entry(),
		output: config.client.output(),
		resolve: { alias, extensions, mainFields },
		module: {
			rules: [
				{
					test: /\.(svelte|html)$/,
					use: {
						loader: 'svelte-loader',
						options: {
							dev,
							hydratable: true,
							hotReload: false, // pending https://github.com/sveltejs/svelte/issues/2377
							preprocess: sveltePreprocess({
								scss: {
									importer: [magicImporter()],
								}
							})
						}
					}
				},
				{
					test: /\.(md|svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf|ogg)(\?.*)?$/,
					loader: 'file-loader',
				},
				{
					test: /\.(scss|sass|css)$/,
					use: [
						'style-loader',
						{ loader: 'css-loader', options: { sourceMap: true } },
						{
							loader: 'sass-loader',
							options: {
								sassOptions: {
									importer: magicImporter(),
								},
							},
						},
					]
				}
			]
		},
		mode,
		plugins: [
			// pending https://github.com/sveltejs/svelte/issues/2377
			// dev && new webpack.HotModuleReplacementPlugin(),
			new webpack.DefinePlugin({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
		].filter(Boolean),
		devtool: dev && 'inline-source-map',
		devServer: {
			contentBase: 'public',
			host: '0.0.0.0',
			port: 3000,
			open: true,
			hot: true,
			overlay: true,
			historyApiFallback: true,
			disableHostCheck: true,
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
		},
	},

	server: {
		entry: config.server.entry(),
		output: config.server.output(),
		target: 'node',
		resolve: { alias, extensions, mainFields },
		externals: Object.keys(pkg.dependencies).concat('encoding'),
		module: {
			rules: [
				{
					test: /\.(svelte|html)$/,
					use: {
						loader: 'svelte-loader',
						options: {
							css: false,
							generate: 'ssr',
							hydratable: true,
							dev,
							preprocess: sveltePreprocess({
								scss: {
									importer: [magicImporter()],
								}
							})
						}
					}
				}
			]
		},
		mode,
		plugins: [
			new WebpackModules()
		],
		performance: {
			hints: false // it doesn't matter if server.js is large
		},
		devServer: {
			contentBase: 'public',
			host: '0.0.0.0',
			open: true,
			port: 3000,
			hot: true,
			overlay: true,
			historyApiFallback: true,
			disableHostCheck: true,
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
		},
	},

	serviceworker: {
		entry: config.serviceworker.entry(),
		output: config.serviceworker.output(),
		mode
	}
};
