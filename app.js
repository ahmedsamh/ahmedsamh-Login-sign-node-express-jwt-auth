const express = require('express');
const mongoose = require('mongoose');
import bodyParser from 'body-parser';
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const path = require('path');
import history from 'connect-history-api-fallback';


const app = express();
app.use(bodyParser.json());

// middleware
// upload image
app.use(express.static(path.join(__dirname , "images")));
app.use(express.static(path.resolve(__dirname, '../dist'), { maxAge: '1y', etag: false }));
app.use(history());

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb://localhost:27017';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);