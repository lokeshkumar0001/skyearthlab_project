const express = require("express");
const cors = require("cors");
const { userRoute } = require("./routes");
const { errorHandler } = require("./middlewares/errorHandler");

module.exports.expressApp = (app) => {
  app.use(cors());

  app.use(express.json());

//   All api routes are defined here
  app.use("/api/user", userRoute);

// Handling server errors
  app.use(errorHandler);
};
