var del = require('del')
var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
var webpack = require('gulp-webpack')
var less = require('gulp-less')
var watch = require('gulp-watch')
var sourcemaps = require('gulp-sourcemaps')

gulp.task('clean', function (callback) {
  del(['dist/'], callback)
})

gulp.task('server', ['clean'], function () {
  return nodemon({
    script: 'index.js',
    ignore: ['dist/**'],
    ext: 'js,jsx'
  })
})

gulp.task('webpack', ['clean'], function () {
  return gulp.src('client.js')
    .pipe(webpack({
      module: {
        loaders: [
          { test: /\.css$/, loader: 'style!css' },
          { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
      },
      output: { filename: 'bundle.js' },
      devtool: 'source-map',
      watch: true
    }))
    .pipe(gulp.dest('dist/'))
})

gulp.task('styles', ['clean'], function () {
  return gulp.src('assets/styles/**/*.less')
    .pipe(watch('assets/styles/**/*.less', { verbose: true }))
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/styles/'))
})

gulp.task('default', ['server', 'webpack', 'styles'])
