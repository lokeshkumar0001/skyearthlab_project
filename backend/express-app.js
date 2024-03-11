/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const { userRoute } = require("./routes");
const { errorHandler } = require("./middlewares/errorHandler");
const path = require("path")

module.exports.expressApp = (app) => {
  var corsOptions = {
    origin: ["https://skyearthlab-project-server.vercel.app/","http://localhost:3000"],
    optionsSuccessStatus: 200 // For legacy browser support
    }
    
  app.use(cors(corsOptions));

  app.use(express.json());

 
//   All api routes are defined here
  app.use("/api/user", userRoute);


  app.use(express.static(path.join(__dirname,"../client/build")));

  app.get("*", (req,res) =>{
      res.sendFile(path.resolve(__dirname,"../client/build/index.html"))
  })

// Handling server errors
  app.use(errorHandler);
};
