if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');

app.set('view engine', 'ejs');                          // Template Engine to be used
app.set('views', __dirname + '/views');                 // Where the layout files are stored.
app.set('layout', 'layouts/layout');                    // Default layout file

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.use(expressLayouts);
app.use(express.static('public'));

app.use('/', indexRouter);







app.listen(process.env.PORT || 3000);

