const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/database");
const adminRouter = require("./route/admin");
const generalRouter = require("./route/general");
const errorController = require("./controller/error");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/", generalRouter);
app.use("/admin", adminRouter);
app.use(errorController);

const startApplication = async () => {
  const PORT = process.env.PORT;
  const DATABASEURL = process.env.DATABASEURL;
  await connectDB(DATABASEURL);
  console.log("connection to database established...");
  app.listen(PORT, () => {
    console.log("server started running...");
  });
};
startApplication();
