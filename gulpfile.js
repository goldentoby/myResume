// for sass(css)
var sass = require("gulp-sass");
var cleanCSS = require("gulp-clean-css");
// for js
var uglify = require("gulp-uglify");
var gulp = require("gulp");
var rename = require("gulp-rename");
var autoprefixer = require("gulp-autoprefixer");
var gls = require("gulp-live-server");

// Copy third party libraries from /node_modules into /vendor
gulp.task("vendor", function() {
  // Bootstrap
  gulp
    .src([
      "./node_modules/bootstrap/dist/**/*",
      "!./node_modules/bootstrap/dist/css/bootstrap-grid*",
      "!./node_modules/bootstrap/dist/css/bootstrap-reboot*"
    ])
    .pipe(gulp.dest("./vendor/bootstrap"));

  // Font Awesome
  gulp.src(["./node_modules/@fortawesome/**/*"]).pipe(gulp.dest("./vendor"));

  // jQuery
  gulp
    .src([
      "./node_modules/jquery/dist/*",
      "!./node_modules/jquery/dist/core.js"
    ])
    .pipe(gulp.dest("./vendor/jquery"));

  // jQuery Easing
  gulp
    .src(["./node_modules/jquery.easing/*.js"])
    .pipe(gulp.dest("./vendor/jquery-easing"));
});

// Compile SCSS
gulp.task("css:compile", function() {
  return gulp
    .src("./scss/**/*.scss")
    .pipe(
      sass
        .sync({
          outputStyle: "expanded"
        })
        .on("error", sass.logError)
    )
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(gulp.dest("./css"));
});

// Minify CSS
gulp.task("style", ["css:compile"], function() {
  return gulp
    .src(["./css/*.css", "!./css/*.min.css"])
    .pipe(cleanCSS())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(gulp.dest("./css"));
});

// Minify JavaScript
gulp.task("script", function() {
  return gulp
    .src(["./js/*.js", "!./js/*.min.js"])
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(gulp.dest("./js"));
});

// Default task
gulp.task("default", ["style", "script", "vendor"]);
gulp.task('serve', function() {
    var server = gls.static('./', 3000);
    server.start();
  });

// Dev task
gulp.task("dev", ["style", "script", "serve"], function() {
  gulp.watch("./scss/*.scss", ["style"]);
  gulp.watch("./js/*.js", ["script"]);
  gulp.watch("./*.html", ["serve"]);
});
