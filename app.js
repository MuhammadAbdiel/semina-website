// Desc: Main entry point for the application
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// middlewares
const notFoundMiddleware = require('./app/middleware/not-found');
const handleErrorMiddleware = require('./app/middleware/handler-error');

// routes
const categoriesRouter = require('./app/api/v1/categories/router');

const app = express();

const v1 = '/api/v1/cms';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the API',
  });
});

app.use(v1, categoriesRouter);

// middlewares
app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
