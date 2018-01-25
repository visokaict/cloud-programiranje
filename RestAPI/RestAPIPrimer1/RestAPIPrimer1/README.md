# RestAPIPrimer1

Primer RestAPI-a realizovanog pomocu Express framework-a.
Takodje u okviru ovog projekta isntaliran je dodatak koji oogucava da aplikacija ne restartuje ako imate neke izmene. U sledecih nekoliko koraka bice navedeni koraci kako se omogucava ova opcija:

1.Instalirajte modul gulp, opcija -g da se gulp moze startovati sa komandne linije 
npm install gulp --save -g  

2.Instalirati modul gulp-nodemon 
npm install gulp-nodemon --save

3.U root-u projekta dodati fajl gulpfile.js u koji treba dodati sledeci kod

var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');


gulp.task('default', function () {
    nodemon({
            script: 'app.js',
            ext: 'js',
            env: {
                PORT: 8000
            },
            ignore: ['./node_modules/**']
        })
        .on('restart', function () {
            console.log('Restarting');
        });
});

4.Otvoriti konzolni prozor u okviru foldera gde se nalazi projekat i izvrsiti komandu gulp

5.Nakon sto se gulp startuje promenite nesto app.js fajlu i sacuvajte promene i vidite sta se desava

