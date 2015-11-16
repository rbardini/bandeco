import del from 'del'
import gulp from 'gulp'
import nodemon from 'gulp-nodemon'
import webpack from 'webpack-stream'
import less from 'gulp-less'
import watch from 'gulp-watch'
import sourcemaps from 'gulp-sourcemaps'

gulp.task('clean', () =>
  del(['dist/'])
)

gulp.task('server', ['clean'], () =>
  nodemon({
    script: 'index.js',
    ignore: ['dist/**'],
    ext: 'js,jsx'
  })
)

gulp.task('webpack', ['clean'], () =>
  gulp.src('client.js')
    .pipe(webpack({
      module: {
        loaders: [
          { test: /\.css$/, loader: 'style!css' },
          { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
      },
      output: { filename: 'bundle.js' },
      devtool: 'source-map',
      watch: true
    }))
    .pipe(gulp.dest('dist/'))
)

gulp.task('styles', ['clean'], () =>
  gulp.src('assets/styles/**/*.less')
    .pipe(watch('assets/styles/**/*.less', { verbose: true }))
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/styles/'))
)

gulp.task('default', ['server', 'webpack', 'styles'])
