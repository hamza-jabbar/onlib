// Use the dotenv library if in local setup
if (process.env.NODE_ENV !== 'production') { require('dotenv').config(); }

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const bookRouter = require('./routes/books');

app.set('view engine', 'ejs');                          // Template Engine to be used
app.set('views', __dirname + '/views');                 // Where the layout files are stored.
app.set('layout', 'layouts/layout');                    // Default layout file

app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

// Database Connection
mongoose.connect(process.env.DB_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

// Main Routes
app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);

// Use available port in production || port 3000 in local setup
app.listen(process.env.PORT || 3000);

