import * as Mongoose from "mongoose";
const config = require('config');

let database: Mongoose.Connection;

export const connect = () => {
  const uri = config.get('mongoURI');
  if (database) {
    return;
  }

  Mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  database = Mongoose.connection;

  database.once("open", async () => {
    console.log("Connected to database");
  });

  database.on("error", () => {
    console.log("Error connecting to database");
  });
};

export const disconnect = () => {
  if (!database) {
    return;
  }
  Mongoose.disconnect();
};
