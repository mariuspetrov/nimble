// Initialize modules

// Import specific Gulp API functions for simplified task definitions
// Example: Use series() directly instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');

// Import Gulp plugins for different build tasks
const dartSass = require('gulp-dart-sass'); // Compile SCSS to CSS
const concat = require('gulp-concat'); // Concatenate files
const terser = require('gulp-terser'); // Minify JavaScript
const postcss = require('gulp-postcss'); // Apply PostCSS plugins to CSS
const autoprefixer = require('autoprefixer'); // Autoprefix CSS for cross-browser compatibility
const cssnano = require('cssnano'); // Minify CSS
const replace = require('gulp-replace'); // String replace for cache busting
const browsersync = require('browser-sync').create(); // Initialize Browsersync for live-reload

// Define file paths for easy reference
const files = {
	appPath: 'app/**/*.*', // All files within the app folder
	scssPath: 'app/scss/**/*.scss', // SCSS files for styling
	jsPath: 'app/js/**/*.js', // JavaScript files
};

// Compile SCSS to CSS, minify and add vendor prefixes, output with sourcemaps
function scssTask() {
	return src(files.scssPath, { sourcemaps: true }) // Set source with sourcemaps
		.pipe(dartSass()) // Compile SCSS to CSS
		.pipe(postcss([autoprefixer(), cssnano()])) // Apply PostCSS plugins: autoprefixer and cssnano
		.pipe(dest('dist', { sourcemaps: '.' })); // Output to dist folder with sourcemaps
}

// Concatenate and minify JavaScript files
function jsTask() {
	return src(
		[
			files.jsPath,
			// ,'!' + 'includes/js/jquery.min.js', // Uncomment to exclude specific files if needed
		],
		{ sourcemaps: true } // Enable sourcemaps for JS
	)
		.pipe(concat('all.js')) // Concatenate JS into a single file named all.js
		.pipe(terser()) // Minify JavaScript
		.pipe(dest('dist', { sourcemaps: '.' })); // Output to dist folder with sourcemaps
}

// Cachebust: Update cache-busting string in specified layout files
function cacheBustTask() {
	const cbString = new Date().getTime(); // Generate a unique string based on the current timestamp
	return src(['app/layout/overall_top.php', 'app/layout/overall_bottom.php']) // Target layout files
		.pipe(replace(/cb=\d+/g, 'cb=' + cbString)) // Replace any existing cache-busting string
		.pipe(dest('app/layout')); // Save changes
}

// Initialize Browsersync to create a local development server
function browserSyncServe(cb) {
	browsersync.init({
		proxy: "localhost/nimble/", // Define proxy server (replace with project URL)
		notify: {
			styles: {
				top: 'auto', // Style notifications to display at the bottom
				bottom: '0',
			},
		},
	});
	cb();
}

// Reload Browsersync server (for live-reload)
function browserSyncReload(cb) {
	browsersync.reload();
	cb();
}

// Watch task: Monitor SCSS and JS files for changes and run respective tasks
function watchTask() {
	watch(
		[files.scssPath, files.jsPath],
		{ interval: 1000, usePolling: true }, // Polling option enables compatibility with Docker environments
		series(parallel(scssTask, jsTask), cacheBustTask) // Run tasks on change
	);
}

// Browsersync Watch task: Watches HTML, SCSS, and JS files
// Reloads browser on HTML changes, runs SCSS and JS tasks on file changes
function bsWatchTask() {
	watch([files.appPath], browserSyncReload); // Reload on HTML changes
	watch(
		[files.scssPath, files.jsPath],
		{ interval: 1000, usePolling: true }, // Polling option enables compatibility with Docker
		series(parallel(scssTask, jsTask), cacheBustTask, browserSyncReload) // Run tasks and reload on SCSS/JS changes
	);
}

// Default Gulp task: runs SCSS and JS tasks, cache-busts, and initiates watch task
exports.default = series(
	parallel(scssTask, jsTask), 
	cacheBustTask, 
	watchTask
);

// Browsersync-enabled task: includes SCSS/JS processing, cache-busting, and live-reload server
// Run by typing "gulp bs" in the terminal
exports.bs = series(
	parallel(scssTask, jsTask),
	cacheBustTask,
	browserSyncServe,
	bsWatchTask
);
