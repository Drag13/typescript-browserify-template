var gulp = require("gulp"),
    browserify = require("browserify"),
    source = require('vinyl-source-stream'),
    watchify = require("watchify"),
    tsify = require("tsify"),
    gutil = require("gulp-util");

var opt = {
    src: {
        ts: ['app/**/*.ts'],
        html: ['index.html'],
    },
    dest: {
        ts: '../server/build/client/js',
        html: '../server/build/client/html',
    },
    browserify: {
        basedir: '.',
        debug: true,
        entries: 'app/app.ts',
        cache: {},
        packageCache: {}
    },
    bundle: "bundle.js"
};


gulp.task("html", function () {
    return gulp.src(opt.src.html)
        .pipe(gulp.dest(opt.dest.html));
});

gulp.task("ts", function () {
    return browserify(opt.browserify)
        .plugin(tsify)
        .bundle()
        .pipe(source(opt.bundle))
        .pipe(gulp.dest(opt.dest.ts));
});

gulp.task("watch", function () {
    gulp.watch(opt.src.html, ["html"]);
    watchTs();
});

function watchTs() {
    function bundle() {
        return watchedBrowserify
            .bundle()
            .on("error", gutil.log)
            .pipe(source(opt.bundle))
            .pipe(gulp.dest(opt.dest.ts));
    }

    watchedBrowserify = watchify(browserify(opt.browserify).plugin(tsify));
    watchedBrowserify.on("update", bundle);
    watchedBrowserify.on("log", gutil.log);

    return bundle();
}


gulp.task("build", ["html", "ts"]);
gulp.task("default", ["build", "watch"]);