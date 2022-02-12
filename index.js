const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const chalk = require("chalk")
require('dotenv').config()
const port = process.env.PORT;
const url =
  "mongodb+srv://usman:Usman1994@cluster0.rlomm.mongodb.net/lawyers?retryWrites=true&w=majority";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use(require("./routes"));

const connectAndStartServer = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(port, () => {
      console.log(chalk.green(`Успешно соединились. Порт ${port}`));
    });
  } catch (e) {
    console.log(chalk.bgRed.white(`Ошибка при подключении: ${e.toString()}`));
  }
};

connectAndStartServer();
