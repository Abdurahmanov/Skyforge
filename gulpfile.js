var gulp = require('gulp');
var stylus = require('gulp-stylus');
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync");
var run = require("run-sequence");

gulp.task("build-app-stylus", function() {
    gulp.src('stylus/style.styl')
        .pipe(plumber())
        .pipe(stylus(
            {
                'include css': true
            }
        ))
        .pipe(postcss([autoprefixer({ browsers: ["last 10 version"] })]))
        .pipe(gulp.dest("css"))
        .pipe(server.reload({stream: true}));
});

gulp.task("watch", function() {

    server.init({
        server: ".",
        notify: false,
        open: true,
        ui: false
    });

    gulp.watch("stylus/**/*.styl", ["build-app-stylus"]);
    gulp.watch("*.html").on("change", server.reload);

});

gulp.task("default", function(fn) {
    run(
        "build-app-stylus",
        fn
    );
});