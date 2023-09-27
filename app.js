const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const limiter = require('./middlewares/rateLimit');
const router = require('./routes/index');
const errorsMiddleware = require('./middlewares/errors');
const corsMiddleware = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();
const { MONGO_URL_DEV } = require('./const');

const { PORT = 3000, NODE_ENV, MONGO_URL } = process.env;
const app = express();
mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : MONGO_URL_DEV);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(corsMiddleware);
app.use(requestLogger);
app.use(helmet());
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorsMiddleware);

app.listen(PORT);
