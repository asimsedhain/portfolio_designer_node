const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors")
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authenticateRouter = require("./routes/authenticate");
const userRouter = require("./routes/user")
const app = express();

const whitelist = ['http://localhost:3000', 'https://capos.netlify.app']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}
app.use(cors(corsOptions))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/authenticate", authenticateRouter);
app.use('/user', userRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
//   res.locals.error = process.env.env === 'development' ? err : {};
	res.locals.error = err

  // render the error page
  res.status(err.status || 500);
  res.json({'error': res.locals.error});
});

module.exports = app;
