
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8000;
const Cloudant = require('@cloudant/cloudant');
const cloudant = Cloudant({ url: process.env.CLOUDANT_URL, username: process.env.CLOUDANT_USERNAME, password: process.env.CLOUDANT_PASSWORD });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/insert', (req, res) => {
  const { email, date, timeSlot, problemDescription, database } = req.body;

  const data = { email, date, timeSlot, problemDescription };

  cloudant.use(database).insert(data, (err, data) => {
    if (err) {
      res.status(500).send({ message: 'Error creating booking', error: err });
    } else {
      res.status(200).send({ message: 'Booking created successfully' });
    }
  });
});

app.post('/register', (req, res) => {
  const { name, email, database } = req.body;

  const data = { name, email };

  cloudant.use(database).insert(data, (err, data) => {
    if (err) {
      res.status(500).send({ message: 'Error creating user', error: err });
    } else {
      res.status(200).send({ message: 'User created successfully' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});