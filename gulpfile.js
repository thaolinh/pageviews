'use strict';

const gulp = require('gulp');
const sass = require('gulp-ruby-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserify = require('gulp-browserify');
const babelify = require('babelify');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const notify = require('gulp-notify');
const livereload = require('gulp-livereload');
const runSequence = require('run-sequence');
const del = require('del');

gulp.task('default', ['styles']);

/** STYLES */
gulp.task('styles', () => {
  runSequence('css-sass', 'css-concat')
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('css-sass', () => {
  return sass('stylesheets/pageviews.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('public_html'))
    .pipe(cssnano());
});

gulp.task('css-concat', () => {
  const coreCSSDependencies = [
    'vendor/stylesheets/bootstrap.min.css',
    'vendor/stylesheets/toastr.css',
    'vendor/stylesheets/font-awesome.min.css'
  ];
  return gulp.src(['public_html/pageviews.css'].concat(coreCSSDependencies))
    .pipe(concat('application.css'))
    .pipe(gulp.dest('public_html'));
});


/** SCRIPTS */
gulp.task('scripts', () => {
  gulp.src('javascripts/pageviews.js')
    // .pipe(babel({
    //   presets: ['es2015']
    // }))
    .pipe(browserify({
      tranform: ['babelify'],
      debug: true
    }))
    .pipe(rename('pageviews.js'))
    .pipe(gulp.dest('public_html'));

  // return b.bundle()
  //   .pipe(source('app.js'))
  //   .pipe(buffer())
  //   .pipe(sourcemaps.init({loadMaps: true}))
  //       // Add transformation tasks to the pipeline here.
  //       .pipe(uglify())
  //       .on('error', gutil.log)
  //   .pipe(sourcemaps.write('./'))
  //   .pipe(gulp.dest('./dist/js/'));
});

gulp.task('js-concat', () => {
  const coreJSDependencies = [
    'vendor/javascripts/jquery.min.js',
    'public_html/jquery.i18n.js',
    'vendor/javascripts/moment.min.js',
    'vendor/javascripts/bootstrap.min.js',
    'vendor/javascripts/toastr.min.js'
  ];
});
