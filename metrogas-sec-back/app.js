var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var axios = require('axios');  // Agrega esta línea para importar axios
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const loginRouter = require('./routes/login'); 

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// Middleware para parsear el cuerpo de la solicitud
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


// Iniciar el servidor
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Servidor Node.js en ejecución en http://localhost:${port}`);
});

module.exports = app;
