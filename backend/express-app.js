const express = require("express");
const cors = require("cors");
const { userRoute } = require("./routes");
const { errorHandler } = require("./middlewares/errorHandler");

module.exports.expressApp = (app) => {
  var corsOptions = {
    origin: ["https://skyearthlab-project-server.vercel.app/","http://localhost:3000"],
    optionsSuccessStatus: 200 // For legacy browser support
    }
    
  app.use(cors(corsOptions));

  app.use(express.json());

  app.use("/",(req,res)=>{
    res.send('server running....')
  })
//   All api routes are defined here
  app.use("/api/user", userRoute);

// Handling server errors
  app.use(errorHandler);
};
