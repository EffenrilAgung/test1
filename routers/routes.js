const express = require('express');

const db = require('../db/Database');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/daftar', (req, res) => {
  res.render('daftar');
});

router.post('/daftar', async (req, res) => {
  const userData = req.body;
  const email = userData.email;
  const userName = userData.userName;
  const password = userData.password;

  const encrypt = await bcrypt.genSalt(10).then((salt) => {
    return bcrypt.hash(password, salt);
  });

  const user = { email, userName, password: encrypt };
  console.log(user);

  const existingUser = await db
    .getDb()
    .collection('users')
    .findOne({ email: email });

  if (existingUser) {
    console.log('Email sudah  digunakan');
    res.redirect('/daftar');
  } else {
    try {
      await db.getDb().collection('users').insertOne(user);
      console.info(`data user berhasil di masukkan `);
    } catch (error) {
      console.error('data user gagal di masukkan', error);
    }

    res.redirect('/daftar');
  }
});

router.get('/list', async (req, res) => {
  const users = await db.getDb().collection('users').find().toArray();
  for (let user = 0; user < users.length; user++) {
    users[user].number = user + 1;
    console.log(users[user]);
  }
  const convert = JSON.stringify(users);
  res.render('list', { convert: convert });
});

module.exports = router;
