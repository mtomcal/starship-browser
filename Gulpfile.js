var gulp       = require('gulp');
var streamify  = require('gulp-streamify');
var babel      = require('gulp-babel');
var uglify     = require('gulp-uglify');
var notify     = require('gulp-notify');
var gutil      = require('gulp-util');
var less       = require('gulp-less');
var rename     = require('gulp-rename');
var nodemon    = require('gulp-nodemon');
var jshint     = require('gulp-jshint');
var react      = require('gulp-react');
var mocha      = require('gulp-mocha');
var selenium   = require('gulp-mocha-selenium');
var livereload = require('gulp-livereload');
var browserify = require('browserify');
var watchify   = require('watchify');
var babelify   = require('babelify');
var source     = require('vinyl-source-stream');
var lazypipe   = require('lazypipe');

var isProduction = process.env.NODE_ENV === 'production';

gulp.task('jshint', function () {
  gulp.src(['views/*.jsx', 'views/**/*.jsx'])
  .pipe(babel()) //Must use react as it preserves lines from jsx to js compile
  .on('error', function(err) {
    console.error(err.message);
  })
  .pipe(streamify(jshint({
    laxbreak: true,
    laxcomma: true,
    es3: true,
    esnext: true, //JSHint Harmony/ES6
    undef: false,
    eqnull: true,
    browser: true,
    jquery: true
  })))
  .on('error', function(err) {
    console.error(err.message);
  })
  .pipe(jshint.reporter('jshint-stylish'))
});

gulp.task('browserify', function () {
  watchify(browserify())
  .transform(babelify) //JSX and ES6
  .require('./views/ClientBootstrap.jsx', {entry: true})
  .bundle()
  .on('error', function(err) {
    console.error(err.message);
  })
  .pipe(source('bundle.js'))
  .pipe(isProduction ? streamify(uglify('./built/')) : gutil.noop()) //Noop is empty stream for passthru
  .pipe(gulp.dest('./static/js'))
  .pipe(livereload())
  .pipe(notify("Rebuilt Website"));
});

gulp.task('less', function () {
  /**
   * LazyPipe is used create streams without initializing them
   * until they are used
   *
   * Never call streams directly
   *
   * .pipe(gulp.dest('/filepath')) becomes
   *
   * .pipe(gulp.dest, '/filepath')
   */

  var prodLess = lazypipe()
  .pipe(less, {
    paths: ['less'],
    dumpLineNumbers: false,
    compress: true,
    cleancss: true,
    yuicompress: true
  })
  .pipe(gulp.dest, './static/css/');

  var devLess = lazypipe()
  .pipe(less, {
    paths: ['less'],
    dumpLineNumbers: 'all',
    compress: false
  })
  .pipe(gulp.dest, './static/css/');

  gulp.src('./less/main.less')
  //Use ternary operator for conditional statements
  .pipe(isProduction ? prodLess() : devLess())
  .pipe(livereload());
});

gulp.task('mocha', function () {
  gulp.src(['test/*_test.js', 'test/**/*_test.js', '!test/selenium/*_test.js'])
  .pipe(mocha({
    reporter: 'spec',
    ui: 'bdd'
  }));

});

gulp.task('selenium', function () {
  gulp.src('test/selenium/*_test.js', {read: false})
  .pipe(selenium({
    browserName: 'chrome',
    reporter: 'spec',
    ui: 'bdd',
    usePromises: true
  }));
});

gulp.task('server', function () {
  livereload.listen();
  nodemon({ script: 'app.js', ext: 'jsx js', ignore: ["static/*.js", "static/**/*.js"] })
  .on('change', ['jshint', 'mocha', 'browserify']) //Only reload jsx on change
});

if (isProduction) {
  gulp.task('default', ['server']);
} else {
  gulp.task('default', ['jshint', 'browserify', 'server']);
}
gulp.task('test', ['jshint', 'mocha', 'selenium']);
gulp.task('build', ['less', 'browserify']);
