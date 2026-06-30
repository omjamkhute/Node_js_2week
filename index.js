const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;


// examples
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
 
    return res.json(user);
});


// by id-------------------------------------------------
// app.get('/api/users/:id' , (req,res) =>{
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);

//     return res.json(user);
// });

// // post
// app.post('/api/users', (req,res) =>{
//    // create new user
//     return res.json({ status: "pending"});
// });

// // patch - edit
// app.patch('/api/users/:id', (req,res) =>{
//    // edit user with id
//     return res.json({ status: "pending"});
// });

// // delete
// app.delete('/api/users/:id', (req,res) =>{
//    // delete user with id
//     return res.json({ status: "pending"});
// });
 // or ----------------------------------------------------

 app 
 .route("/api/users/:id")
 .get((req,res) =>{
      const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
 })
 .post((req,res) =>{
     return res.json({ status: "pending"});
 })
 .patch((req,res) =>{
      return res.json({ status: "pending"});
 })
 .delete((req,res) =>{
      return res.json({ status: "pending"});
 });

app.listen(8000, ()=> console.log(`rest api started..at ${PORT}`));