const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors")
const indexRouter = require('./routes/index');
const authenticateRouter = require("./routes/authenticate");
const portfolioRouter = require("./routes/portfolio")
const userRouter = require("./routes/user")
const app = express();

const whitelist = ['http://localhost:3000', 'https://capos.netlify.app']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(createError(401))
    }
  },
  credentials: true
}
app.use(cors(corsOptions))

app.use(logger('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use("/authenticate", authenticateRouter);
app.use('/user', userRouter)
app.use("/portfolio", portfolioRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err,req, res, next){
	console.error(`${new Date().toLocaleString()}: ${err.stack}`)
	next(err)
})


// final error handler
app.use(function(err, req, res, next) {

  // sending the error response
  res.status(err.status || 500);
  res.json({'error': err.message});
});

module.exports = app;
