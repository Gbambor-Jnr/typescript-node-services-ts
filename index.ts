import App from "./services/ExpressApp";
import express from "express";
import dbConnection from "./services/Database";

const StartServer = async () => {
  const app = express();

  await dbConnection();
  await App(app);

  app.listen(9080, () => {
    console.log("app is connected");
  });
};

StartServer();
