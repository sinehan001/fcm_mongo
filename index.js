const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();
app.use(bodyParser.json());

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);

const userSchema = new mongoose.Schema({
    title: String,
    message: String
});

const FCM = mongoose.model("FCM", userSchema);

app.post('/send', function(req,res) {
    console.log(req.body.title);
    console.log(req.body.message);
    var myData = { title: req.body.title, message: req.body.message };
    FCM.create(myData, function(err, result) {
        if (err) throw err;
        res.send("Data Sent");
    });
});

app.listen(process.env.PORT, ()=> {
    console.log("Server running on "+process.env.PORT);
})