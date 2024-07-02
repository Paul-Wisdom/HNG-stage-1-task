const express = require('express');
require('dotenv').config();

const port = process.env.PORT;

const app = express();

app.get('/api/hello', (req, res, next) => {
    const name = req.query.visitor_name
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    return res.json({client_ip: ip, message: `hello ${name}`});
})

app.use('/', (req, res, next) => {
    return res.json({message: "wow"});
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
module.exports = app;