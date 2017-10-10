var gulp = require('gulp');

var sass = require('gulp-sass');

var browserSync = require('browser-sync').create();

var useref = require('gulp-useref');

var uglify = require('gulp-uglify');

var gulpIf = require('gulp-if');

var cssnano = require('gulp-cssnano');

var imagemin = require('gulp-imagemin');

var runSequence = require('run-sequence');

var del = require('del');

// SCSS into CSS
gulp.task('sass', function(){
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass()) //using gulp-sass
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

// Watch documents
gulp.task('watch',['browserSync','sass'], function(){
	gulp.watch('app/scss/**/*.scss',['sass']);
	gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});

// Reload browser
gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: 'app'
		},
	})
});

// Minify assets

gulp.task('useref', function (){
	return gulp.src('app/*.html')
		.pipe(userref())
		.pipe(gulpIf('*.js', uglify()))
		// minifies only if it's a CSS file

		.pipe(gulIf('*.css', cssnano()))
		.pipe(gulp.dest('dist'))
});

//minify images 

gulp.task('images', function(){
	gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
	// Caching images that ran through imagemin
	.pipe(cache(imagemin({
		interlaced: true
	})))
	.pipe(gulp.dest('dist/images'))
});

//Fonts copy into DIST folder 

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

//Clean task

gulp.task('clean:dist', function(){
	return del.sync('dist');
});

//concat all tasks in one 

gulp.task('build', function(callback){
	runSequence('clean:dist',['sass','userref','images','fonts'],
		callback
		)
});



