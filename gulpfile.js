'use strict';

const gulp = require('gulp');
const babel = require('babelify');
const browserify = require('browserify');
const runSequence = require('run-sequence');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const watchify = require('watchify');
const del = require('del');
const pump = require('pump');
const plugins = require('gulp-load-plugins')();

const appDependencies = {
  'pageviews': {
    css: [
      'vendor/stylesheets/select2.min.css',
      'vendor/stylesheets/daterangepicker.min.css'
    ],
    js: [
      'vendor/javascripts/select2.min.js',
      'vendor/javascripts/daterangepicker.min.js',
      'vendor/javascripts/Chart.min.js'
    ]
  },
  'langviews': {
    css: ['vendor/stylesheets/daterangepicker.min.css'],
    js: [
      'vendor/javascripts/HackTimer.min.js',
      'vendor/javascripts/daterangepicker.min.js',
      'vendor/javascripts/bootstrap-typeahead.js',
      'vendor/javascripts/Chart.min.js'
    ]
  },
  'topviews': {
    css: [
      'vendor/stylesheets/select2.min.css',
      'vendor/stylesheets/bootstrap-datepicker.min.css'
    ],
    'js': [
      'vendor/javascripts/select2.min.js',
      'vendor/javascripts/bootstrap-datepicker.min.js'
    ]
  },
  'siteviews': {
    css: [
      'vendor/stylesheets/select2.min.css',
      'vendor/stylesheets/daterangepicker.min.css'
    ],
    js: [
      'vendor/javascripts/select2.min.js',
      'vendor/javascripts/daterangepicker.min.js',
      'vendor/javascripts/Chart.min.js'
    ]
  },
  'massviews': {
    css: ['vendor/stylesheets/daterangepicker.min.css'],
    js: [
      'vendor/javascripts/HackTimer.min.js',
      'vendor/javascripts/daterangepicker.min.js',
      'vendor/javascripts/bootstrap-typeahead.js',
      'vendor/javascripts/Chart.min.js'
    ]
  },
  'redirectviews': {
    css: ['vendor/stylesheets/daterangepicker.min.css'],
    js: [
      'vendor/javascripts/HackTimer.min.js',
      'vendor/javascripts/daterangepicker.min.js',
      'vendor/javascripts/bootstrap-typeahead.js',
      'vendor/javascripts/Chart.min.js'
    ]
  },
  'meta': {
    css: [
      'vendor/stylesheets/select2.min.css',
      'vendor/stylesheets/daterangepicker.min.css'
    ],
    js: [
      'vendor/javascripts/select2.min.js',
      'vendor/javascripts/daterangepicker.min.js',
      'vendor/javascripts/Chart.min.js'
    ]
  }
};
const apps = Object.keys(appDependencies);

/** STYLES */
gulp.task('styles', apps.map(app => `styles-${app}`));

apps.forEach(app => {
  gulp.task(`styles-${app}`, () => {
    runSequence(`css-sass-${app}`, `css-concat-${app}`);
  });
});

apps.forEach(app => {
  gulp.task(`css-sass-${app}`, () => {
    const path = app === 'pageviews' ? '' : `${app}/`;
    console.log(`stylesheets/${path}${app}.scss`);
    return plugins.rubySass(`stylesheets/${path}${app}.scss`, { style: 'expanded' })
      .pipe(plugins.autoprefixer('last 2 version'))
      .pipe(gulp.dest(`public_html/${path}`))
      .pipe(plugins.cssnano());
  });
});

apps.forEach(app => {
  gulp.task(`css-concat-${app}`, () => {
    const path = app === 'pageviews' ? '' : `${app}/`;
    const coreCSSDependencies = [
      'vendor/stylesheets/bootstrap.min.css',
      'vendor/stylesheets/toastr.css',
      'vendor/stylesheets/font-awesome.min.css'
    ];
    return gulp.src(coreCSSDependencies
        .concat(appDependencies[app].css)
        .concat([`public_html/${path}${app}.css`])
      )
      .pipe(plugins.concat('application.css'))
      .pipe(gulp.dest(`public_html/${path}`))
      .pipe(plugins.notify('Styles task complete'));
  });
});


/** SCRIPTS */
gulp.task('scripts', apps.map(app => `scripts-${app}`));

apps.forEach(app => {
  gulp.task(`scripts-${app}`, () => {
    runSequence(`js-browserify-${app}`, `js-concat-${app}`);
  });
});

apps.forEach(app => {
  gulp.task(`js-browserify-${app}`, () => {
    const path = app === 'pageviews' ? '' : `${app}/`;
    const bundler = browserify(
      `javascripts/${path}${app}.js`, { debug: true }
    ).transform(babel.configure({
      presets: ['es2015']
    }));

    const rebundle = () => {
      bundler.bundle()
        .on('error', err => {
          console.error(err);
          this.emit('end');
        })
        .pipe(source(`${app}.js`))
        .pipe(buffer())
        .pipe(gulp.dest(`public_html/${path}`));
    };

    rebundle();
  });
});

apps.forEach(app => {
  gulp.task(`js-concat-${app}`, () => {
    const path = app === 'pageviews' ? '' : `${app}/`;
    const coreJSDependencies = [
      'vendor/javascripts/jquery.min.js',
      'public_html/jquery.i18n.js',
      'vendor/javascripts/moment.min.js',
      'vendor/javascripts/bootstrap.min.js',
      'vendor/javascripts/toastr.min.js',
      'vendor/javascripts/simpleStorage.js'
    ];
    return gulp.src(coreJSDependencies
        .concat(appDependencies[app].js)
        .concat([`public_html/${path}${app}.js`])
      )
      .pipe(plugins.concat('application.js'))
      .pipe(gulp.dest(`public_html/${path}`))
      .pipe(plugins.notify('Scripts task complete'));
  });
});

/** LINTING */
gulp.task('eslint', () => {
  return gulp.src(['javascripts/**/*.js'])
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError());
});
gulp.task('scsslint', () => {
  return gulp.src('stylesheets/**/*.scss')
    .pipe(plugins.scssLint());
});

/** COMPRESSION */
gulp.task('compress', apps.map(app => `compress-${app}`));

apps.forEach(app => {
  const path = app === 'pageviews' ? '' : `${app}/`;
  gulp.task(`compress-${app}`, cb => {
    pump([
      gulp.src(`public_html/${path}application.js`),
      plugins.uglify(),
      gulp.dest(`public_html/${path}`)
    ], cb);
  });
});

/** MAIN TASKS */
apps.forEach(app => {
  gulp.task(app, [`styles-${app}`, `scripts-${app}`]);
});

gulp.task('lint', ['eslint', 'scsslint']);

gulp.task('watch', () => {
  // compile all apps if shared files are altered
  gulp.watch('stylesheets/_*.scss', ['styles']);
  gulp.watch('javascripts/shared/*.js', ['scripts']);

  apps.forEach(app => {
    gulp.watch(`stylesheets/${app}/*.scss`, [`styles-${app}`]);
    gulp.watch(`javascripts/${app}/*.js`, [`scripts-${app}`]);
  });
});

gulp.task('production', () => {
  runSequence(['styles', 'scripts'], 'compress');
});

gulp.task('default', ['watch']);
