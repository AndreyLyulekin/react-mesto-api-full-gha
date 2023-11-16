// IMPORT PACKAGES
const express = require("express");

const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const { errors } = require("celebrate");

// IMPORT MIDDLEWARES
const cors = require("./middlewares/cors");
const { requestLogger, errorLogger } = require("./middlewares/logger");

// CONFIG VARIABLES
const { PORT, DB_URL } = process.env;
const NotFoundError = require("./errors/NotFound");

// PARSERS METHODS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DATABASE CONNECT
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// DEFENSE MIDDLEWARES
app.use(helmet());
app.use(cors);

// REQUEST LOGGER
app.use(requestLogger);

// ROUTES METHOD
app.use("/", require("./routes/index"));

app.use("*", (req, res, next) => {
  next(new NotFoundError("Страница не найдена"));
});

// ERRORS
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
  next();
});

app.listen(PORT);
