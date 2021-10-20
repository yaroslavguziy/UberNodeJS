require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const router = require('./routes/allRoutes');

const app = express();
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.use(router);

const portNumber = 8080;
const PORT = +process.env.PORT || portNumber;
const DB = process.env.DB;

const start = async () => {
  try {
    await mongoose.connect(DB, { useNewUrlParser: true });
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(`Error on server: ${e.message}`);
  }
};
start();
