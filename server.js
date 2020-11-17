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
// app.get('/searches', (req, res) => res.render('pages/searches/new', {searchResults: []}));
app.post('/searches', createSearch);

function renderHomePage(req, res) {
  res.render('pages/index');
}

function showForm(req, res) {
  res.render('pages/searches/new.ejs');
}

function renderError(req, res) {
  res.render('pages/error');
}

function createSearch(req, res) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q='

  if(req.body.search[1] === 'title') {url += `+intitle:${req.body.search[0]}`;}
  if(req.body.search[1] === 'author') {url += `+inauthor:${req.body.search[0]}`;}

  // console.log(url);
  superagent.get(url)
  .then(data => {
    console.log(data);
    return data.body.items.map(book => {
      // console.log(book);
      return new Book(book.volumeInfo);
    });
  })
  .then(results => {
    res.render('pages/searches/show.ejs', { searchResults: JSON.stringify(results) });
  })
  .catch(err => {
    res.render('pages/error', err);
  });
}

function Book(info) {
  this.title = info.title || 'no title available';
  this.author = info.author || 'no author available';
}


app.listen(PORT, () => {
  console.log(`server up::: ${PORT}`);
})