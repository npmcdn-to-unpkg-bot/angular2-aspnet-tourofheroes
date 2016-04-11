/// <binding BeforeBuild='default' Clean='clean' />
"use strict";

var path = require('path');
var gulp = require('gulp');
var del = require('del');
var eventStream = require('event-stream');
var typescript = require('gulp-typescript');
var inlineNg2Template = require('gulp-inline-ng2-template');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require("gulp-uglify");

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
    ]
};

// -----------------------------------------------------------------
// Build Tasks
// -----------------------------------------------------------------
// Copy 3-rd party libs
gulp.task('build.lib', function() {
    return gulp.src(config.lib, { base: config.libBase })
        .pipe(gulp.dest(webroot + 'lib'));
});

// Transpile TypeScript
gulp.task('build.tsc', function() {
    var tsProject = typescript.createProject('./tsconfig.json');
    var tsSrcInlined = gulp.src([webroot + '**/*.ts'], { base: webroot })
        .pipe(inlineNg2Template({ base: webroot }));
    return eventStream.merge(tsSrcInlined, gulp.src('./typings/main.d.ts'))
        .pipe(typescript(tsProject))
        .pipe(gulp.dest(webroot));
});

gulp.task('build.prod', ['build.lib', 'build.tsc'], function() {
    return gulp.src([webroot + '**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(webroot));
});

gulp.task('build.dev', ['build.lib', 'build.tsc'], function() {

});

gulp.task('clean', function() {
    return del([webroot + 'lib',
        webroot + '**/*.js'
    ]);
});

gulp.task('default', ['build.dev']);
