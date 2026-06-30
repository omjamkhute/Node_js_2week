

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

