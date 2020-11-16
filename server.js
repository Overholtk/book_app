'use strict'

const express = require('express');
const app = express();
const superagent = require('superagent');
require('dotenv').config();
require('ejs');
const PORT = process.env.PORT || 3001;

app.use(express.static('./public'));

app.use(express.urlencoded({ extended: true}));

app.set('view engine', 'ejs');

app.get('/', renderHomePage);
app.get('/searches/new', showForm);
// app.post('/searches', createSearch);

function renderHomePage(req, res) {
  res.render('pages/index');
}

function showForm(req, res) {
  res.render('pages/searches/new.ejs');
}


app.listen(PORT, () => {
  console.log(`server up::: ${PORT}`);
})