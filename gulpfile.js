var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserify = require('browserify'),
    source = require("vinyl-source-stream"),
    watchify = require('watchify'),
    livereload = require('gulp-livereload'),
    gulpif = require('gulp-if'),
    watch;

gulp.task('compile-sass', function() {
    gulp.src('./src/sass/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./dist/css/'))
});

gulp.task('browserify-nowatch', function() {
    watch = false;
    browserifyShare();
});

gulp.task('browserify-watch', function() {
    watch = true;
    browserifyShare();
});

function browserifyShare() {
    var b = browserify({
        cache: {},
        packageCache: {},
        fullPaths: true
    });

    if(watch) {
        // if watch is enable, wrap this bundle inside watchify
        b = watchify(b);
        b.on('update', function() {
            bundleShare(b);
        });
    }

    b.add('./src/js/index.js');
    bundleShare(b);
}

function bundleShare(b) {
    b.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(gulpif(watch, livereload()));
}

// define the browserify-watch as dependencies for this task
gulp.task('watch', ['browserify-watch'], function() {
    // watch other files, for example .sass file
    gulp.watch('./src/sass/*.sass',
        ['compile-sass']);

    // Start live reload server
    livereload.listen(35729);
});