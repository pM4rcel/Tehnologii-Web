const http = require('http');
const path = require('path');
const fs = require('fs');
const express = require('express');

require('dotenv').config();


const CONTENT_TYPE = new Map([
    ['.html', 'text/html'],
    ['.css', 'text/css'],
    ['.js', 'text/javascript'],
    ['.png', 'image/png'],
    ['.jpg', 'image/jpg'],
    ['.map', 'text/css']
]);

const app = express();

app.use(express.static(path.join(__dirname)));
app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', "true");
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods','GET');
    res.setHeader('Access-Control-Allow-Headers','*')
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started...");
});

// const app = http.createServer((request, response) => {
//     const filePath = path.join(__dirname, request.url === '/' ? '/index.html' : request.url);
//     console.log(filePath);
//     fs.readFile(path.resolve(__dirname, 'src', filePath),  (error, data) => {
//         if(!error) {
//             response.status = 200;
//             response.setHeader('Content-Type', CONTENT_TYPE.get(path.extname(filePath)));
//             response.end(data);
//         }else{
//             response.status = 500;
//             response.setHeader('Content-Type', 'text/plain');
//             response.end('Internal Server Error');
//         }
//     });
//
// });
//
// const PORT = process.env.PORT || 3000;
// const HOSTNAME = process.env.HOSTNAME || 'localhost';
//
// app.listen(PORT, HOSTNAME,() => {
//     console.log(`Server running on ${HOSTNAME}:${PORT}`);
// });