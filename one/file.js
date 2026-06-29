// file system with fs we can interact with files 

const fs = require("fs");

// fs.writeFileSync('./test.txt','file sys hello');


// sync return result
// const res =  fs.readFileSync("./contact.txt","utf-8");

// console.log(res);

// async -------------------------expect callback fn - return err or result
// fs.readFile("./contact.txt","utf-8", (err , result) =>{
//     if(err){
//         console.log("Error",err);
//     }else{
//         console.log(result);
//     }
// })
// dont return any thing

// sync need to stop over ridde
// they append not override


// fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString());
fs.appendFileSync("./test.txt", `current time ${Date.now()} Sec\n `);

// copy 
// fs.cpSync('./test.txt' , './copy.txt');

// delet
//fs.unlinkSync('./copy.txt');

// status of files
console.log(fs.statSync('./test.txt').isFile());

// mkdir
fs.mkdirSync("my-docs/a/b",{recursive: true});