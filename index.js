const express = require('express');
const path = require('path');

const router = require('./routers/routes');
const db = require('./db/Database');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(router);

db.connectToDatabase().then(() => {
  console.log(`http://localhost:${PORT}`);
  app.listen(PORT);
});
