const express = require('express');
// const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('cors');
require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(requestLogger);
app.use(errorLogger);
app.use(errors());

app.listen(PORT);