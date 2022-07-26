if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
const cors = require("cors");
const postRoute = require("./routes/posts");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize")
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ExpressError = require("./utils/ExpressError");


mongoose
  .connect(process.env.MONGO_URL || 'mongodb://localhost/karim')
  .then(console.log("Connected to mongoDB"))
  .catch((err) => console.log(err));



app.use(express.json());
app.use(cors());
app.use(mongoSanitize({
  replaceWith:"_"
}))
app.use(helmet());
app.use("/api/posts", postRoute);



app.all("*",(req,res,next)=>{
  throw new ExpressError("Route not found",404);
})

app.use((err,req,res,next)=>{
  const {statusCode = 500, success = false, message = 'Something went wrong'} = err;
  res.status(statusCode).json({
    message,
    success
  })
})

app.listen(5000, function (req, res) {
  console.log("Server running on port 5000");
});
