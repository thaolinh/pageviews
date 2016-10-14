'use strict';

const gulp = require('gulp');
const babel = require('babelify');
const browserify = require('browserify');
const runSequence = require('run-sequence');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const watchify = require('watchify');
const del = require('del');
const plugins = require('gulp-load-plugins')();

gulp.task('default', ['styles']);

/** STYLES */
gulp.task('styles', () => {
  runSequence('css-sass', 'css-concat');
});

gulp.task('css-sass', () => {
  return plugins.rubySass('stylesheets/pageviews.scss', { style: 'expanded' })
    .pipe(plugins.autoprefixer('last 2 version'))
    .pipe(gulp.dest('public_html'))
    .pipe(plugins.cssnano());
});

gulp.task('css-concat', () => {
  const coreCSSDependencies = [
    'vendor/stylesheets/bootstrap.min.css',
    'vendor/stylesheets/toastr.css',
    'vendor/stylesheets/font-awesome.min.css'
  ];
  return gulp.src(['public_html/pageviews.css', 'vendor/stylesheets/select2.min.css'].concat(coreCSSDependencies))
    .pipe(plugins.concat('application.css'))
    .pipe(gulp.dest('public_html'))
    .pipe(plugins.notify('Styles task complete'));
});


/** SCRIPTS */
gulp.task('scripts', () => {
  runSequence('js-browserify', 'js-concat');
});

gulp.task('js-browserify', () => {
  const bundler = browserify('javascripts/pageviews.js', { debug: true }).transform(babel);

  const rebundle = () => {
    bundler.bundle()
      .on('error', err => {
        console.error(err);
        this.emit('end');
      })
      .pipe(source('pageviews.js'))
      .pipe(buffer())
      .pipe(gulp.dest('public_html'));
  };

  rebundle();
});

gulp.task('js-concat', () => {
  const coreJSDependencies = [
    'vendor/javascripts/jquery.min.js',
    'public_html/jquery.i18n.js',
    'vendor/javascripts/moment.min.js',
    'vendor/javascripts/bootstrap.min.js',
    'vendor/javascripts/toastr.min.js',
    'javascripts/shared/polyfills.js',
    'javascripts/shared/core_extensions.js'
  ];
  return gulp.src(coreJSDependencies.concat(
    [
      'vendor/javascripts/select2.min.js',
      'vendor/javascripts/daterangepicker.min.js',
      'vendor/javascripts/Chart.min.js',
      'public_html/pageviews.js'
    ]))
    .pipe(plugins.concat('application.js'))
    .pipe(gulp.dest('public_html'))
    .pipe(plugins.notify('Scripts task complete'));
});

gulp.task('watch', function() {
  gulp.watch('stylesheets/**/*.scss', ['styles']);
  gulp.watch('javascripts/**/*.js', ['scripts']);
});
