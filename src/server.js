const express = require('express');
const app = express();

const routerAuth = require('./components/auth/router');
const routerPost = require('./components/post/router');

app.use(express.json());
app.use(express.urlencoded({ extended: 'false' }));

app.get('/', (req, res) => {
  res.status(200).json({ data: 'Hello World!' });
});

app.use(routerAuth);
app.use(routerPost);

module.exports = app;
