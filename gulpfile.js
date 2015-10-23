var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var beautify = require('gulp-beautify');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var sass = require('gulp-ruby-sass');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');


gulp.task('styles',function(){
  return sass('./public/scss/**/*.scss',{style:'expanded'})
  .pipe(autoprefixer("last 2 versions"))
  .pipe(gulp.dest('./dist/css'))
  .pipe(rename({suffix:'.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('./dist/css'))
  .pipe(notify({message:"SASS Comiled"}));
});


gulp.task('scripts', function(){
  return gulp.src('./public/javascript/**/*.js')
  .pipe(concat('jsBundle.js'))
  .pipe(beautify({indentSize:4,indentChar:''}))
  .pipe(gulp.dest('./dist/js'))
  .pipe(rename({suffix:'.min'}))
  .pipe(ngAnnotate())
  .pipe(uglify())
  .pipe(gulp.dest('./dist/js'))
  .pipe(notify({message:'Minified JS and Bundled.'}));
});

gulp.task('watch', function(){
  gulp.watch('./public/javascript/**/*.js',['scripts']);
});
