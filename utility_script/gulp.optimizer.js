"use strict";
const gulp = require("gulp");
let cleanCSS = require("gulp-clean-css");
gulp
  .src("./out/_next/static/css/*.css")
  .pipe(cleanCSS({ compatibility: "ie7", level: 2 }))
  .pipe(gulp.dest("./out/_next/static/css/"));
