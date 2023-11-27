const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");

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

const helloRouter = require("./routes/hello");
app.use("/", helloRouter);

//eslint-disable-next-line max-len
const dbURI = `mongodb+srv://${process.env.MONGODBUSERNAME}:${process.env.MONGODBPASSWORD}@cluster0.b9cgb.mongodb.net/${process.env.MONGODBDBNAME}?retryWrites=true&w=majority`;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port || 3000);
    })
    .catch((err) => {
        //eslint-disable-next-line no-console
        console.log(err);
    });

