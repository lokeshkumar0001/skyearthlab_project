const express = require("express");
const cors = require("cors");
const { userRoute } = require("./routes");
const { errorHandler } = require("./middlewares/errorHandler");

module.exports.expressApp = (app) => {
  app.use(cors());

  app.use(express.json());

  app.use("/",(req,res)=>{
    res.send('server running....')
  })
//   All api routes are defined here
  app.use("/api/user", userRoute);

// Handling server errors
  app.use(errorHandler);
};
