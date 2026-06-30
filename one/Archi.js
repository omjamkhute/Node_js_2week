
const fs = require("fs");
//

// // blocking - sync---------------------------

/* console.log("1");  // run 1st
   const result = fs.readFileSync("contact.txt", "utf-8"); // thread is assign
   console.log(result);
    -------m ---   after complit 2 - 3 is run  ---- 
   console.log("2") */

// non-blocking----------------------------Async
/* console.log("1");  // run 1st

fs.readFile("contact.txt" ,"utf-8", (err, result) =>{
    console.log(result);
})   // run 3

console.log("2");  // run 2  */


const os = require("os");
console.log(os.cpus().length);