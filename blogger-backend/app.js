const express = require('express')
const path = require('path')
const logger = require('morgan')
const mongoose = require('mongoose')
const blogRouter = require('./routes/blog')
const usersRouter = require('./routes/users')
require('dotenv').config()

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', blogRouter);
app.use('/users', usersRouter);

mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB Connected')
}).catch(err => {
    console.log(`MongoDB Error: ${err}`)
})


module.exports = app;
