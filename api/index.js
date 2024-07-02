const express = require('express');
const axios = require('axios');
require('dotenv').config();

const port = process.env.PORT;

const app = express();

const key = process.env.API_KEY;

// const geolocationApiUrl = "http://ip-api.com/json/";
// const weatherApiUrl = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${testIp}`;

// axios.get(geolocationApiUrl + testIp).then(result => {
//     console.log(result.data.city);
//     return axios.get(weatherApiUrl)
// }).then(result => {
//     console.log(result.data.current.temp_c);
// }).catch(err => console.log(err));

app.get('/api/hello', (req, res, next) => {
    const name = req.query.visitor_name
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    let city;
    let temp;
    const geolocationApiUrl = "http://ip-api.com/json/";
    const weatherApiUrl = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${ip}`;

    axios.get(geolocationApiUrl + ip).then(result => {
        city = result.data.city;
        return axios.get(weatherApiUrl)
    }).then(result => {
        temp = result.data.current.temp_c;
        return res.json({client_ip: ip, location: `city`, greeting: `Hello ${name}, the weather is at ${temp} celsius at ${city}`});
    }).catch(err => console.log(err));
    
})

app.use('/', (req, res, next) => {
    return res.json({message: "wow"});
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
module.exports = app;