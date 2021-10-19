const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

//get html page with form
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

//handle form submit
app.post("/", function(req, res) {

    const query = req.body.countryName;
    const url = "https://restcountries.com/v2/name/" + query;

    https.get(url, function(response){
        console.log(response.statusCode);

        //take data from api
        response.on("data", function(data){

            //make data readable
            const countryData = JSON.parse(data);
            const name = countryData[0].name;
            const capital = countryData[0].capital;
            const flag = countryData[0].flags.svg;

            //show result to user
            res.write("<a href='/'>&larr; Go back</a>");
            res.write("<h1>" + name + "</h1>");
            res.write("<h2>Capital: " + capital + "</h2>");
            res.write("<img src=" + flag + " alt=" + name + "-flag />");

            res.send();
        });
    });     

})


app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on http://localhost:3000/");
})