'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')();

gulp.task('triangular.scss', function () {
  return gulp.src(paths.src + '/app/triangular/**/*.scss')
    .pipe($.concat('triangular.scss'))
    .pipe(gulp.dest(paths.tmp + '/serve/app/'));
});

gulp.task('styles', ['triangular.scss'], function () {

  var sassOptions = {
    style: 'expanded',
    includePaths: [
      'bower_components'
    ]
  };

  var injectFiles = gulp.src([
    paths.tmp + '/serve/app/triangular.scss',
    paths.src + '/app/**/*.scss',
    '!' + paths.src + '/app/app.scss',
    '!' + paths.src + '/app/**/_*.scss',
    '!' + paths.src + '/app/triangular/**/*'
  ], { read: false });

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace(paths.src + '/app/', '');
      return '@import \'' + filePath + '\';';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  var indexFilter = $.filter('app.scss', {
    restore: true
  });

  return gulp.src([
    paths.src + '/app/app.scss'
  ])
    .pipe(indexFilter)
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(indexFilter.restore)
    .pipe($.sass(sassOptions))

  .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']}))
    .on('error', function handleError(err) {
      console.error(err.toString());
      this.emit('end');
    })
    .pipe(gulp.dest(paths.tmp + '/serve/app/'));
});
