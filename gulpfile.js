const gulp = require('gulp');

const settings = {
	copy : {
		files: ['backend/**/*.html']
	},
	watch: {
		files: ['backend/**/*.html']
	},
	base: './'
};

gulp.task('copy', function () {
	return gulp.src(settings.copy.files)
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
	return gulp.watch(settings.watch.files, function(obj){
		if( obj.type === 'changed') {
			gulp.src(obj.path)
				.pipe(gulp.dest('dist'));
		}
	});
});
