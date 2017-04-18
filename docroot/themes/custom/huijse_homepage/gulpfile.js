'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var stripDebug = require('gulp-strip-debug');
var browserSync = require('browser-sync');
var rename = require("gulp-rename");

// Paths configuration
var paths = {
  sass: 'sass',
  css: 'css',
  sourceJs: 'src_js',
  js: 'js',
  img: 'img',
  fonts: 'fonts',
  tpl: 'twig'
};

//////////////////////////////
// Begin Gulp Tasks
//////////////////////////////

// Javascript linting task
gulp.task('lint', function () {
  return gulp.src([
      paths.sourceJs + '/**/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// JavaScript processing task
gulp.task('scripts', function() {
  return gulp.src(paths.sourceJs + '/**/*.js')
    // Concatenate everything within the JavaScript folder.
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(paths.js))
    .pipe(rename('scripts.min.js'))
    // Strip all debugger code out.
    .pipe(stripDebug())
    // Minify the JavaScript.
      .pipe(uglify({
          mangle: {
              except: ['Drupal']
          }
      }))
    .pipe(gulp.dest(paths.js));
});

// Sass compilation task
gulp.task('sass', function () {
  return gulp.src(paths.sass + '/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix(["last 2 version", "> 1% in NL", "ie 8"]))
    .pipe(sourcemaps.write('sourcemaps'))
    .pipe(gulp.dest(paths.css));
});

// File watching task
gulp.task('watch', function () {
  gulp.watch(paths.sourceJs + '/**/*.js', ['lint', 'scripts']);
  gulp.watch(paths.sass + '/**/*.scss', ['sass']);
});

// BrowserSync task
gulp.task('browserSync', function () {
  var options = {
    //proxy: 'example.localhost',
    ghostMode: {
      clicks: true,
      forms: true,
      scroll: false
    },
    reloadOnRestart: false,
    logSnippet: false
  };
  browserSync.init([
    paths.css +  '/**/*.css',
    paths.js + '/**/*.js',
    paths.img + '/**/*',
    paths.fonts + '/**/*',
    paths.templates + '/**/*'
  ], options);
});

// Default task
gulp.task('default', ['scripts', 'watch', 'sass', 'browserSync']);
