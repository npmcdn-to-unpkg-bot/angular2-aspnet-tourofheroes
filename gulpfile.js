﻿/// <binding BeforeBuild='default' Clean='clean' />
"use strict";

var path = require('path');
var gulp = require('gulp');
var del = require('del');
var eventStream = require('event-stream');
var typescript = require('gulp-typescript');
var inlineNg2Template = require('gulp-inline-ng2-template');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require("gulp-uglify");
var tslint = require('gulp-tslint');
var runSequence = require('run-sequence');
var Server = require('karma').Server;

// -----------------------------------------------------------------
// Config
// -----------------------------------------------------------------
var project = require("./project.json");
var webroot = "./wwwroot/";

var config = {
  libBase: 'node_modules',
  lib: [
    require.resolve('bootstrap/dist/css/bootstrap.css'),
    require.resolve('bootstrap/dist/css/bootstrap.css.map'),
    path.dirname(require.resolve('bootstrap/dist/fonts/glyphicons-halflings-regular.woff')) + '/**',
    require.resolve('systemjs/dist/system.src.js'),
    require.resolve('angular2/bundles/angular2.dev.js'),
    require.resolve('angular2/bundles/router.dev.js'),
    require.resolve('angular2/bundles/http.dev.js'),
    require.resolve('jquery/dist/jquery.js'),
    require.resolve('bootstrap/dist/js/bootstrap.js')
  ],
  js: webroot + '**/*.js',
  ts: webroot + '**/*.ts'
};

// -----------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------
// Copy 3-rd party libs
gulp.task('copy:lib', function () {
  return gulp.src(config.lib, { base: config.libBase })
    .pipe(gulp.dest(webroot + 'lib'));
});

// Delete libs and generated .js
gulp.task('clean', function () {
  return del([webroot + 'lib',
    webroot + '**/*.js.map',
    webroot + '**/*.js'
  ]);
});

// Lint for style
gulp.task('tslint', function () {
  return gulp.src(config.ts)
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
})

// -----------------------------------------------------------------
// Compile
// -----------------------------------------------------------------
var tsProject = typescript.createProject('./tsconfig.json');

var getMergedTsSourceEventStream = function () {
  var tsSrcInlined = gulp.src([config.ts], { base: webroot })
    .pipe(inlineNg2Template({ base: webroot }));
  return eventStream.merge(tsSrcInlined, gulp.src('./typings/main.d.ts'));
}

gulp.task('compile:prod', function () {
  var tsMerged = getMergedTsSourceEventStream();
  return tsMerged
    .pipe(sourcemaps.init())
    .pipe(typescript(tsProject)).js
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(webroot));
});

gulp.task('compile:dev', function () {
  var tsMerged = getMergedTsSourceEventStream();
  return tsMerged
    .pipe(sourcemaps.init())
    .pipe(typescript(tsProject)).js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(webroot));
});


// -----------------------------------------------------------------
// Test tasks
// -----------------------------------------------------------------
// Run once and exit
gulp.task('karma:once', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }).start(done);
});

// Watch for file changes and re-run tests on each change
gulp.task('karma:watch', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }).start(done);
});

gulp.task('test', function (done) {
  runSequence('build.dev',
    'karma:once',
    done);
});

gulp.task('test.watch', function (done) {
  runSequence('build.dev',
    'karma:watch',
    done);
});

// -----------------------------------------------------------------
// Build tasks
// -----------------------------------------------------------------
gulp.task('build.prod', function (done) {
  runSequence('clean',
    'compile:prod',
    'copy:lib',
    done);
});

gulp.task('build.dev', function (done) {
  runSequence('clean',
    'tslint',
    'compile:dev',
    'copy:lib',
    done);
});

gulp.task('default', ['build.dev']);
