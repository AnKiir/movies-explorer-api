const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DEV_DATABASE_URL } = require('./config');
const limiter = require('./middlewares/rateLimit');
const corsMiddleware = require('./middlewares/cors');
const errorsMiddleware = require('./middlewares/errors');
require('dotenv').config();

const { PORT = 3000, DATABASE_URL, NODE_ENV } = process.env;
const app = express();
mongoose.connect(NODE_ENV === 'production' ? DATABASE_URL : DEV_DATABASE_URL);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.use(corsMiddleware);
app.use(helmet());
app.use(limiter);

app.use(requestLogger);
app.use(errorLogger);
app.use(errors());
app.use(errorsMiddleware);

app.listen(PORT);