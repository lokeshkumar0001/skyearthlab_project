const express = require("express");
const { PORT } = require("./config/config");
const { connectDatabse } = require("./config/database");
const { expressApp } = require("./express-app");
const app = express();

// Making a database connection
connectDatabse();

app.use("/",(req,res)=>{
  res.send('server running....')
})
expressApp(app);

app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});
