const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
const PORT = 8000;

// Middleware (must come first)-----------------------------------------------------------
app.use(express.urlencoded({ extended: false }));
// app.use(express.json()); still work

// next means next middleware or route fn
app.use((req,res, next) =>{ 
   console.log("Middleware one....!")
   req.myUsername = "Om boss";
   // req get stuck here - return res.json({msg: "Middile ware res end"});
   next(); // express pass automatically 
});

app.use((req,res, next) =>{ 
  fs.appendFile(
    'log.txt',
    `${Date.now()}: ${req.method}: ${req.ip}: ${req.path}\n`,
          (err,data) =>{
            next();
          });
 //   return res.json({msg: "Middile ware res end"});  // req get stuck here -
 // express pass automatically 
});

// examples------------------------------------------------------------------------------
app.get('/users' , (req,res) =>{
    const html = `
    <ol>
    ${users.map(users => `<li>${users.first_name} ${users.last_name} ${users.email}</li>`).join("")}
    </ol>
    `;
    res.send(html);
})

// route----------------------------------

app.get('/api/users' , (req,res) =>{
    // x - means custom header
    res.setHeader("X-MyName", "OM sallu");
    return res.json(users);
});


 app 
 .route("/api/users/:id")  //  app.route("/api/users/:id") for specific user 
 .get((req,res) =>{
    
      const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
 })

 .post((req,res) =>{
    const body = req.body;
    console.log("Body",body);
    // add data in mock folder
    users.push({ id: users.length + 1  , ...body // +1 
    });
    // not sync
     fs.writeFile('./MOCK_DATA.json',
        // null - replacer / 2 intendation (space)
         JSON.stringify(users,null,2), (err, data ) =>{
        return res.json({ status: "Success", id: users.length + 1
        });
    });
 })
.patch((req,res) =>{
      return res.json({ status: "pending"});
 })
 .delete((req,res) =>{
      return res.json({ status: "pending"});
 });


 // route

app.listen(8000, ()=> console.log(`rest api started..at ${PORT}`));