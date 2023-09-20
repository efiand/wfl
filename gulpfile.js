import gulp from 'gulp';
import posthtml from 'gulp-posthtml';
import bemValidator from 'gulp-html-bem-validator';
import htmlhint from 'gulp-htmlhint';
import postcss from 'gulp-postcss';
import vinylNamed from 'vinyl-named';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config.js';
import imagemin from 'gulp-imagemin';
import svgo from 'imagemin-svgo';
import svgoConfig from './svgo.config.js';
import mozjpeg from 'imagemin-mozjpeg';
import pngquant from 'imagemin-pngquant';
import clean from 'gulp-clean';
import webp from 'gulp-webp';
import stackSprite from 'gulp-svg-sprite';
import eslint from 'gulp-eslint';
import lintspaces from 'gulp-lintspaces';
import rename from 'gulp-rename';
import browsersync from 'browser-sync';
import del from 'del';

const { src, dest, watch, series, parallel } = gulp;
const server = browsersync.create();
const Options = {
  LINTSPACES: {
    editorconfig: '.editorconfig'
  }
};

const Path = {
  DIST: 'public',
  Build: {
    CSS: ['src/css/entry/**/*.css'],
    JS: ['src/js/entry/**/*.js']
  },
  Watch: {
    HTML: 'src/**/*.njk',
    CSS: 'src/**/*.css',
    JS: ['*.{js,cjs}', 'src/**/*.js'],
    IMG: 'place/img/**/*.{svg,png,jpg}',
    IMG_DEST: 'public/img/**/*.{png,jpg}',
    ICONS: 'place/icons/**/*.{svg,png}',
    SPRITE: 'src/icons/*.svg'
  }
};

const buildHTML = () => src('src/njk/pages/**/*.njk')
  .pipe(posthtml())
  .pipe(bemValidator())
  .pipe(rename({ extname: '.html' }))
  .pipe(dest(Path.DIST));

const buildCSS = () => src(Path.Build.CSS)
  .pipe(postcss())
  .pipe(rename({ suffix: '.min' }))
  .pipe(dest(`${Path.DIST}/css`));

const buildJS = () => src(Path.Build.JS)
  .pipe(vinylNamed())
  .pipe(webpackStream(webpackConfig, webpack))
  .pipe(dest(`${Path.DIST}/js`));

const saveImages = () => src(Path.Watch.IMG)
  .pipe(imagemin([
    svgo(svgoConfig),
    mozjpeg({ quality: 75, progressive: true }),
    pngquant()
  ]))
  .pipe(clean())
  .pipe(dest(`${Path.DIST}/img`));

const createWebp = () => src(Path.Watch.IMG_DEST)
  .pipe(webp({ quality: 80 }))
  .pipe(dest(`${Path.DIST}/img`));

const optimizeIcons = () => src(Path.Watch.ICONS)
  .pipe(imagemin([
    svgo(svgoConfig),
    pngquant()
  ]))
  .pipe(clean())
  .pipe(dest('src/icons'));

const buildSprite = () => src(Path.Watch.SPRITE)
  .pipe(stackSprite({ mode: { stack: true } }))
  .pipe(rename('sprite.min.svg'))
  .pipe(dest(`${Path.DIST}/img`));

const testHTML = () => src(Path.Watch.HTML)
  .pipe(htmlhint('.htmlhintrc')) // Форк конфига HTML Academy с поправкой на модульность и шаблонизатор
  .pipe(htmlhint.reporter())
  .pipe(lintspaces(Options.LINTSPACES))
  .pipe(lintspaces.reporter());

const testCSS = () => src(Path.Watch.CSS)
  .pipe(postcss())
  .pipe(lintspaces(Options.LINTSPACES))
  .pipe(lintspaces.reporter());

const testJS = () => src(Path.Watch.JS)
  .pipe(eslint({
    fix: false
  }))
  .pipe(eslint.format())
  .pipe(lintspaces(Options.LINTSPACES))
  .pipe(lintspaces.reporter());

const reload = (done) => {
  server.reload();
  done();
};

const startServer = () => {
  server.init({
    cors: true,
    server: Path.DIST,
    ui: false
  });

  watch(['src/data/**/*', Path.Watch.HTML], series(testHTML, buildHTML, reload));
  watch(Path.Watch.CSS, series(testCSS, buildCSS, reload));
  watch(Path.Watch.JS, series(testJS, buildJS, reload));
  watch(Path.Watch.IMG, saveImages);
  watch(Path.Watch.IMG_DEST, series(createWebp, reload));
  watch(Path.Watch.ICONS, series(optimizeIcons, buildCSS, reload));
  watch(Path.Watch.SPRITE, series(buildSprite, reload));
};

const cleanDest = () => del([
  `${Path.DIST}/**/*.{html,css,js,webp}`,
  `${Path.DIST}/img/sprite.min.svg`,
  `${Path.DIST}/pixelperfect`
]);

export const test = parallel(testHTML, testCSS, testJS);
const prepare = parallel(test, cleanDest, saveImages, optimizeIcons);
const compile = parallel(buildHTML, buildCSS, buildJS, createWebp, buildSprite);
export const build = series(prepare, compile);
export default series(build, startServer);
