let gulp = require('gulp');
let svgToJsx = require('gulp-svg-to-jsx');
let svgmin = require('gulp-svgmin');
let rename = require('gulp-rename');
let header = require('gulp-header');
let footer = require('gulp-footer');
let flatten = require('gulp-flatten');

let buildSvg = () => {
    return gulp
        .src('./input/instagram.svg')
        .pipe(
            svgmin({
                plugins: [
                    {
                        removeViewBox: false,
                    },
                    {
                        cleanupIDs: {
                            prefix: {
                                toString() {
                                    this.counter = this.counter || 0;
                                    return `id-${this.counter++}`;
                                }
                            }
                        }
                    }
                ]
            })
        )
        .pipe(
            svgToJsx({
                es6: true,
            })
        )
        .pipe(
            header(`import React from 'react';\nconst SVG = () => { return (`)
        )
        .pipe(
            footer(`);\n};\nexport default SVG;`)
        )
        .pipe(
            rename({
                extname: '.js',
            })
        )
        .pipe(flatten())
        .pipe(gulp.dest('./output'));
}

gulp.task('default', buildSvg);