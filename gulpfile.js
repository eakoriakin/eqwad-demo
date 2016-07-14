const gulp = require('gulp'),
    runSequence = require('run-sequence'),
    del = require('del'),
    typescript = require('gulp-typescript'),
    tsconfig = require('./tsconfig.json'),
    sourcemaps = require('gulp-sourcemaps'),
    tslint = require('gulp-tslint'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    cleanCss = require('gulp-clean-css');

const paths = {
    source: {
        css: 'app/**/*.less',
        ts: 'app/**/*.ts',
        html: ['app/**/*.html', '!app/index.html'],
        index: 'app/index.html',
        config: ['tsconfig.json']
    },
    build: {
        root: 'build',
        css: 'build/css',
        js: 'build',
        html: 'build/app',
        libraries: 'build/libraries'
    },
    packages: {
        'eqwad-combo-box': [
            'node_modules/eqwad-combo-box/eqwad-combo-box.css',
            'node_modules/eqwad-combo-box/eqwad-combo-box.js',
            'node_modules/eqwad-combo-box/eqwad-combo-box.js.map',
            'node_modules/eqwad-combo-box/eqwad-combo-box-filter.pipe.js',
            'node_modules/eqwad-combo-box/eqwad-combo-box-filter.pipe.js.map',
            'node_modules/eqwad-combo-box/eqwad-combo-box.component.js',
            'node_modules/eqwad-combo-box/eqwad-combo-box.component.js.map'
        ]
    }
}

var build = function(complete) {
    runSequence('clean', 'copy-libraries', ['check-ts', 'copy-js', 'copy-css', 'copy-html'], complete);
}

gulp.task('clean', function() {
    del.sync([paths.build.root + '/**/*', '!' + paths.build.root]);
});

gulp.task('copy-libraries', ['clean'], function() {
    gulp.src([
            'node_modules/font-awesome/**/*'
        ])
        .pipe(gulp.dest(paths.build.libraries + '/font-awesome'));

    gulp.src(paths.packages['eqwad-combo-box'])
        .pipe(gulp.dest(paths.build.libraries + '/eqwad-combo-box'));

    gulp.src([
            'node_modules/angular2/bundles/angular2-polyfills.js',
            'node_modules/angular2/bundles/angular2.js',
            'node_modules/angular2/bundles/router.js',
        ])
        .pipe(gulp.dest(paths.build.libraries + '/angular2'));

    gulp.src([
            'node_modules/systemjs/dist/system.src.js'
        ])
        .pipe(gulp.dest(paths.build.libraries + '/systemjs'));

    return gulp.src([
            'node_modules/rxjs/bundles/Rx.js'
        ])
        .pipe(gulp.dest(paths.build.libraries + '/rxjs'));
});

gulp.task('copy-html', function() {
    gulp.src(paths.source.index)
        .pipe(gulp.dest(paths.build.root));

    return gulp.src(paths.source.html)
        .pipe(gulp.dest(paths.build.html));
});

gulp.task('copy-js', function() {
    return gulp
        .src(tsconfig.files, {
            base: './'
        })
        .pipe(sourcemaps.init())
        .pipe(typescript(tsconfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.build.js));
});

gulp.task('copy-css', function() {
    return gulp.src(paths.source.css)
        .pipe(concat('app.css'))
        .pipe(less())
        .pipe(cleanCss())
        .pipe(gulp.dest(paths.build.css))
        .pipe(browserSync.stream());
});

gulp.task('check-ts', function() {
    return gulp.src(paths.source.ts)
        .pipe(tslint({
            formatter: 'verbose'
        }))
        .pipe(tslint.report({
            emitError: false
        }));
});

gulp.task('build', function() {
    build(browserSync.reload);
});

gulp.task('start', function() {
    build(function() {
        browserSync.init({
            server: {
                baseDir: paths.build.root
            }
        });

        // Watch CSS files.
        gulp.watch(paths.source.css, ['copy-css']);

        // Watch HTML files.
        gulp.watch([paths.source.html, paths.source.index], ['copy-html', browserSync.reload]);

        // Watch JS files.
        gulp.watch(paths.source.ts).on('change', function() {
            build(browserSync.reload);
        });

        // Watch configuration files.
        gulp.watch(paths.source.config).on('change', function() {
            build(browserSync.reload);
        });

        // Watch eqwad-combo-box.
        gulp.watch(paths.packages['eqwad-combo-box']).on('change', function() {
            build(browserSync.reload);
        });
    });
});

gulp.task('default', ['start']);
