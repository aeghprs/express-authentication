const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

require("dotenv").config();
const port = process.env.PORT;

//cors policy
const cors = require("cors");
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content_Type,Accept,Authorization",
    );
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
    next();
});

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 50,
    message: "Too many requests from this address, Please try again after 5 mins."
});
app.use(limiter);


const registerRouter = require("./routes/auth");
app.use("/", registerRouter);

const helloRouter = require("./routes/hello");
app.use("/", helloRouter);

const dbURI = `mongodb+srv://${process.env.MONGODBUSERNAME}:
${process.env.MONGODBPASSWORD}@cluster0.b9cgb.mongodb.net/${process.env.MONGODBDBNAME}?retryWrites=true&w=majority`;

mongoose.connect(dbURI)
    .then(() => {
        app.listen(port || 3000);
    })
    .catch((err) => {
        //eslint-disable-next-line no-console
        console.log(err.message);
    });

