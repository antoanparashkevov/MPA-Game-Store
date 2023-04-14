const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');

//local middlewares
const session = require('../middlewares/session');
const trimBody = require('../middlewares/trimBody');

module.exports = (app) => {
    const hbs = handlebars.create({
        extname: '.hbs'
    })

    app.engine('.hbs', hbs.engine);//it allows to use render;
    app.set('view engine', '.hbs');//it is not required to type everywhere .hbs when we call render

    app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(session());
    app.use(trimBody('password'));
}