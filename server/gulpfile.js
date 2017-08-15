var gulp = require('gulp');
var path = require('path');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var cp = require('child_process');
var tsb = require('gulp-tsb');

var opt = {
    src: {
        ts: ['./app/**/*.ts'],
        html: ['./views/*.jade'],
        all: ['./build/**/*.js', './build/views/*.jade']
    },
    dest: {
        js: './build/',
        html: './build/views',
    }
};

gulp.task('test', function () {
    throw Error('test task is not implememnted');
});

// run browser-sync on for client changes
gulp.task('browser-sync', ['nodemon', 'watch'], function () {
    browserSync.init(null, {
        proxy: 'http://localhost:3000',
        files: opt.src.all,
        port: 7000,
    });
});

// run nodemon on server file changes
gulp.task('nodemon', function (cb) {
    var started = false;

    return nodemon({
        script: './build/www.js',
        watch: opt.src.all
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    }).on('restart', function onRestart() {
        setTimeout(function reload() {
            browserSync.reload({
                stream: false
            });
        }, 500); // browserSync reload delay
    });
});

// TypeScript build for /src folder 
var tsConfigSrc = tsb.create('./tsconfig.json');
gulp.task('build', function () {
    return gulp.src(opt.src.ts)
        .pipe(tsConfigSrc())
        .pipe(gulp.dest(opt.dest.js));
});

gulp.task('copy-html', function () {
    return gulp.src(opt.src.html)
        .pipe(gulp.dest(opt.dest.html));
});

gulp.task('watch', function () {
    gulp.watch(opt.src.ts, ['build']);
    gulp.watch(opt.src.html, ['copy-html']);
});

gulp.task('buildAll', ['build', 'copy-html']);
gulp.task('run', ['browser-sync']);