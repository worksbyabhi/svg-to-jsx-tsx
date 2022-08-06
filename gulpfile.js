let gulp = require('gulp');
let svgToJsx = require('gulp-svg-to-jsx');
let svgmin = require('gulp-svgmin');
let rename = require('gulp-rename');
let header = require('gulp-header');
let footer = require('gulp-footer');
let flatten = require('gulp-flatten');

let getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

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
                                    return `id-${getRndInteger(100, 100000)}`;
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