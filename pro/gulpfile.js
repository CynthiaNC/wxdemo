var gulp = require('gulp'),
      plugins = require('gulp-load-plugins')();

// html文件压缩
// gulp.task('minify-html', function () {
//     gulp.src('./build/*.html') // 要压缩的html文件
//     .pipe(plugins.minifyHtml({collapseWhitespace: true})) //压缩
//     .pipe(gulp.dest('dist/'));
// });

// css文件压缩,并且合并
// gulp.task('clean-css', function () {
//     gulp.src('./styles/*.css') // 要压缩的css文件
//     .pipe(plugins.cleanCss()) //压缩css
//     .pipe(plugins.concat('all.css'))  // 合并匹配到的css文件并命名为 "all.css"
//     .pipe(gulp.dest('dist/qimeng/styles'));
// });

// js代码检查，不检查requireJS的代码
// gulp.task('jsLint', function () {
//     gulp.src('./scripts/*[!require_2.1.11].js')
//     .pipe(plugins.jshint())
//     .pipe(plugins.jshint.reporter()); // 输出检查结果
// });

// js文件压缩
// gulp.task('minify-js', function () {
//     gulp.src('./scripts/*.js') // 要压缩的js文件
//     .pipe(plugins.uglify())  //使用uglify进行压缩
//     .pipe(gulp.dest('dist/qimeng/scripts')); //压缩后的路径
// });

// 图片压缩
gulp.task('image-min', function () {
    gulp.src('./build/images/*')
    .pipe(plugins.imagemin())
    .pipe(gulp.dest('./dist/images'));
});


// gulp.task('default',['minify-html', 'image-min']);
gulp.task('default',['image-min']);