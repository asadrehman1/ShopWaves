const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const path = require("path");

//config
dotenv.config({path:"backend/config/config.env"});


app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(fileUpload());

// Routes imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
 
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);

app.use(express.static(path.join(__dirname,"../frontend/build")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
})
// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;