const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig(webpack => {
	return {
		resolve : {
			alias : {
				'@' : __dirname + '/resources/js'
			}
		},
		output : {
			chunkFilename : 'js/[name].bundle.js',
			publicPath : '/'
		}
	}
});

mix.react('resources/js/user/app.jsx', 'public/assets/js/user.js')
    .react('resources/js/admin/app.jsx', 'public/assets/js/admin.js');