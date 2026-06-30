const http = require("http");
const fs = require("fs");
const url = require("url");
// req = client info
// const express = require("express");

// app - handler function
// const app = express();

// app which req need handler ex- get - path : ex - / (home)

// app.get('/',(req,res) =>{
//     res.send('Home page using express');
// });

// app.get('/about',(req,res) =>{
//     res.send('About page using express');
// });

function myHandler(req,res){


    if(req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.method} ${req.url} New Request received\n`;

    const myUrl = url.parse(req.url,true);
    // console.log(myUrl);

    fs.appendFile('log.txt', log, (err, data) =>{

        switch(myUrl.pathname){

            case '/':
            if(req.method === 'GET') res.end(" home page");
            break;

            case '/about':
            const username = myUrl.query.mynameis
            res.end(`Hi, ${username}`);
            break;
            // example
            case '/search':
            const search = myUrl.query.search_query;
            res.end("Result is here  " + search );
            break;
            // SIGNUP
            case '/signup':
                const signupname = myUrl.query.mysignup;
            if(req.method === 'GET'){
                 res.end(`This is signup form next ${signupname}`);
            }
            else if(req.method === 'POST'){
                // put data in db 
                 res.end("login success ");
            }
            break;

            default:
                res.statusCode = 404;
                res.end("404  not found"); 
        }
    })

};


const myServer = http.createServer(myHandler);

myServer.listen(3000, ()=> console.log("server started ......"));


