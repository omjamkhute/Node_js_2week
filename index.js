
const express = require("express");
//db
const { connectMongoDb } = require("./connection.js");
// middleware
const { logReqRes } = require('./middlewares/index');
// routes
const userRouter =require('./routes/user');
// app instance
const app = express();
const PORT = 8000;

// connection monogodb
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1")
.then(()=> console.log("MongoDb connect"));

// Middleware plugin----------------------------------------------------------
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes('log.txt'));

// -Routes------------
app.use("/api/users", userRouter);

 // route listen
app.listen(8000, ()=> console.log(`rest api started..at ${PORT}`));



const express = require("express");
const app = express();

app.get("/", (req,res) =>{
    return res.send("Express Home: ");
});

app.get("/about", (req,res) =>{
    return res.send(`Great to see : ${req.query.name}`);
});
// http://localhost:3000/about?name=+ojexpress

// replace---
// const myServer = http.createServer(app);
// myServer.listen(3000, ()=> console.log("server started ......"));

app.listen(3000, () => console.log("server start-----"));


