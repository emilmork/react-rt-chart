const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
 
gulp.task('default', () => {
    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015', 'react']
        }))
        .pipe(concat('index.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./'));
});