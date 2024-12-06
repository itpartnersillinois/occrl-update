var gulp = require("gulp");
var concat = require("gulp-concat");
var cssmin = require('gulp-cssmin');
var sass = require('gulp-dart-sass');

gulp.task("styles", function () {
    return gulp.src(['_sass/*.scss'])
        .pipe(sass())
        .pipe(cssmin())
        .pipe(concat("site.css"))
        .pipe(gulp.dest("style/"));
});

gulp.task("copy2020", function () {
    return gulp.src('./archive2020/**')
        .pipe(gulp.dest('./_site/archive2020'));
});

gulp.task("copy2021", function () {
    return gulp.src('./archive2021/**')
        .pipe(gulp.dest('./_site/archive2021'));
});

gulp.task("copy2022", function () {
    return gulp.src('./archive2022/**')
        .pipe(gulp.dest('./_site/archive2022'));
});

gulp.task("copy2023", function () {
    return gulp.src('./archive2023/**')
        .pipe(gulp.dest('./_site/archive2023'));
});

gulp.task("default", gulp.series("styles"));
