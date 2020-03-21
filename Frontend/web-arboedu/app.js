/**
 * ZikaWEB 
 *
 * @author  dfd2@cin.ufpe.br
 * @version 1.0
 */

//Dependencies
var express = require('express');
var routes = require('./routes');
var path = require('path');
var cookieParser = require('cookie-parser'); // cookie parser is tied into express sessions and passport to provide user session experience
var morgan = require('morgan'); // allows server to print all requests made and display on console window.
var session = require('express-session');
var connection = require('express-myconnection');
var passport = require('passport');
var flash = require('connect-flash');
var mysql = require('mysql');


var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 4300;
var config = require('./config')
var dbOptions = {
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    port: config.database.port,
    database: config.database.db
}

const testmode = false; // if true the system would lock your ipaddress for 1 minute if you make 3 requests within 10 seconds, else if false the system would lock your ipaddress for 20 minutes if you make 13 requests in 10 minutes
const parameters = testmode ? {
    minutesLocked: 1, // lock your ip address for 1 minute
    windowMs: 10 * 1000, // the brute force limit is 10 seconds for 3 request
    max: 2,

} : {
    minutesLocked: 20, // lock your ip address for 13 minutes
    windowMs: 10 * 60 * 1000, // the brute force limit is 10 minutes for 13 request
    max: 12,
}

// all environments
app.set('views', './views');
app.set('view engine', 'ejs');

//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6000000 }
}))


app.use(passport.initialize());
app.use(passport.session()); // passport uses the previous session  declared to piggy back off of
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(connection(mysql, dbOptions, 'pool'));
app.use(app.router);
app.use(express.static('./public'));

if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//ROUTES
require('./routes/passport')(passport, parameters); //passport auth
require('./routes/sistema')(app, passport, parameters); //login,edit,delet,logout
require('./routes/cadastro')(app, passport, parameters); //signin
require('./routes/escola')(app, passport);
require('./routes/admin')(app, passport);
require('./routes/desafio')(app, passport);
require('./routes/ranking')(app, passport);
require('./routes/atividade')(app, passport);
require('./routes/desafios')(app, passport);


//URLS
app.get('/', routes.index);

//SERVER
server.listen(port, () => {
    var mes = server.address().port;
    console.log('Server is listening at %s', ": " + mes);
});

return app;;











//
//Bootstrap
//#region bootstrap 
var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var browserSync = require('browser-sync').create();

// Set the banner content
var banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
    ' */\n',
    ''
].join('');

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function() {

    // Bootstrap
    gulp.src([
            './node_modules/bootstrap/dist/**/*',
            '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
            '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
        ])
        .pipe(gulp.dest('./vendor/bootstrap'))

    // Font Awesome
    gulp.src([
            './node_modules/font-awesome/**/*',
            '!./node_modules/font-awesome/{less,less/*}',
            '!./node_modules/font-awesome/{scss,scss/*}',
            '!./node_modules/font-awesome/.*',
            '!./node_modules/font-awesome/*.{txt,json,md}'
        ])
        .pipe(gulp.dest('./vendor/font-awesome'))

    // jQuery
    gulp.src([
            './node_modules/jquery/dist/*',
            '!./node_modules/jquery/dist/core.js'
        ])
        .pipe(gulp.dest('./vendor/jquery'))

    // jQuery Easing
    gulp.src([
            './node_modules/jquery.easing/*.js'
        ])
        .pipe(gulp.dest('./vendor/jquery-easing'))

    // Simple Line Icons
    gulp.src([
            './node_modules/simple-line-icons/fonts/**',
        ])
        .pipe(gulp.dest('./vendor/simple-line-icons/fonts'))

    gulp.src([
            './node_modules/simple-line-icons/css/**',
        ])
        .pipe(gulp.dest('./vendor/simple-line-icons/css'))

});

// Compile SCSS
gulp.task('css:compile', function() {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass.sync({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./css'))
});

// Minify CSS
gulp.task('css:minify', ['css:compile'], function() {
    return gulp.src([
            './css/*.css',
            '!./css/*.min.css'
        ])
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

// CSS
gulp.task('css', ['css:compile', 'css:minify']);

// Minify JavaScript
gulp.task('js:minify', function() {
    return gulp.src([
            './js/*.js',
            '!./js/*.min.js'
        ])
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./js'))
        .pipe(browserSync.stream());
});

// JS
gulp.task('js', ['js:minify']);

// Default task
gulp.task('default', ['css', 'js', 'vendor']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// Dev task
gulp.task('dev', ['css', 'js', 'browserSync'], function() {
    gulp.watch('./scss/*.scss', ['css']);
    gulp.watch('./js/*.js', ['js']);
    gulp.watch('./*.html', browserSync.reload);
});
//#endregion