/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const { userRoute, customerRoute } = require("./routes");
const { errorHandler } = require("./middlewares/errorHandler");
const path = require("path")

module.exports.expressApp = (app) => {
    
  app.use(cors());

  app.use(express.json());

 
//   All api routes are defined here
  app.use("/api/user", userRoute);
  app.use("/api/customer", customerRoute);


  app.use(express.static(path.join(__dirname,"../client/build")));

  app.get("*", (req,res) =>{
      res.sendFile(path.resolve(__dirname,"../client/build/index.html"))
  })

// Handling server errors
  app.use(errorHandler);
};
