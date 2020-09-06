var syntax        = 'scss'; // Syntax: sass or scss;

var gulp          = require('gulp'),
    gutil         = require('gulp-util' ),
    sass          = require('gulp-sass'),
    browserSync   = require('browser-sync'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    cleancss      = require('gulp-clean-css'),
    rename        = require('gulp-rename'),
    autoprefixer  = require('gulp-autoprefixer'),
    notify        = require('gulp-notify'),
	rsync         = require('gulp-rsync');
	
const webpack			= require('webpack');
const webpackStream 	= require('webpack-stream');
const VueLoaderPlugin 	= require('vue-loader/lib/plugin');
require("babel-polyfill");

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false,
        // open: false,
        // online: false, // Work Offline Without Internet Connection
        // ghostMode: false //Disable clicks,scrolls & form inpust on any devices
        // tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
    })
});

gulp.task('styles', function() {
    return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
        .pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
        .pipe(rename({ suffix: '.min', prefix : '' }))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream())
});

gulp.task('scripts', function() {
    return gulp.src([
        // Without JQuery dependensies
        // JQuery dependent
        // 'app/js/vendors/bootstrap.min.js',
		'app/js/vendors/jquery-3.4.1.js',
        'app/js/vendors/jquery.smartmenus.js',
        'app/js/vendors/swiper.min.js',
        'app/js/vendors/jquery.fancybox.min.js',
        'app/js/vendors/wow.js',
		'app/js/vendors/stacktable.js',
		'app/js/vendors/jquery.inputmask.min.js',
        'app/js/common.js', // Always at the end
    ])
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('code', function() {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({ stream: true }))
});

//gulp.task('rsync', function() {
//	return gulp.src('app/**')
//	.pipe(rsync({
//		root: 'app/',
//		hostname: 'username@yousite.com',
//		destination: 'yousite/public_html/',
//		// include: ['*.htaccess'], // Includes files to deploy
//		exclude: ['*Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
//		recursive: true,
//		archive: true,
//		silent: false,
//		compress: true
//	}))
//});

gulp.task('es6', done => {
	return script = gulp.src('./app/webpackJS/index.js')
	.pipe(webpackStream({
		// mode: config.production ? 'production' : 'development',
		mode: 'development',
		output: {
			filename: 'bundle.min.js',
		},
		entry: ["babel-polyfill", "./app/webpackJS/index.js"],
		module: {
			rules: [
				{
					test: /\.(js)$/,
					exclude: /(node_modules)/,
					loader: 'babel-loader',
				},
				{
					test: /\.vue$/,
					loader: 'vue-loader'
				}
			]
		},
		performance: {
			hints: false,
			maxEntrypointSize: 1000000,
			maxAssetSize: 1000000
		},
		resolve: {
			extensions: ['*', '.js', '.vue', '.json']
		},
		plugins: [
			// new webpack.ProvidePlugin({
			// 	$: "jquery",
			// 	jQuery: "jquery"
			// }),
			new VueLoaderPlugin()
		]
	}))
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.stream({ stream: true }))
});

gulp.task('watch', function() {
    gulp.watch('app/'+syntax+'/**/*.'+syntax+'', gulp.parallel('styles'));
    gulp.watch(['app/libs/**/*.js', 'app/js/common.js', 'app/js/vendors/**/*.js'], gulp.parallel('scripts'));
	gulp.watch('app/*.html', gulp.parallel('code'));
	gulp.watch(['app/webpackJS/**/*.js', 'app/webpackJS/**/*.vue'], gulp.parallel('es6'));
});
gulp.task('default', gulp.parallel('styles', 'scripts', 'es6', 'browser-sync', 'watch'));