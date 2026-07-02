const express = require("express");
const fs = require("fs");
const mongoose = require('mongoose');
const app = express();
const PORT = 8000;

// connect mongobd
mongoose
.connect('mongodb://127.0.0.1:27017/youtube-app-1')
.then(()=> console.log("mongodb connected yt"))
.catch((err) => console.log('mongo error',err));

// schema ----------------designe
const userSchema = new mongoose.Schema({
   firstName: {
       type: String,
       required: true,
   },
   lastName: {
      type: String,
      required: false,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   gender: {
      type: String,
      required: true,
   },
   jobTitle: {
      type: String,
      required: true
   },
     },
    { timestamps: true }
);

// define model-----
const User = mongoose.model("user", userSchema);

// Middleware (must come first)-----------------------------------------------------------
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));


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

// examples---------Routes------------
app.get('/users' , async  (req,res) =>{
   const allDbUsers = await User.find({});
    const html = `
    <ol>
    ${allDbUsers
      .map(
         user => 
            `<li>${user.firstName}
          ${user.lastName} 
          ${user.email}</li>`)
          .join("")}
    </ol>
    `;
    res.send(html);
});

// route--------get all users-----------------

app.get('/api/users' , async (req,res) =>{
   const allDbUsers = await User.find({});
    // x - means custom header
    res.setHeader("X-MyName", "OM sallu");
    return res.json(allDbUsers);
});

// by id
 app 
 .route("/api/users/:id")  //  app.route("/api/users/:id") for specific user 
 .get(async (req,res) =>{
    const user = await User.findById(req.params.id);

    if(!user) return res.status(404).json({error: 'user not found'});
    return res.json(user);
 })
// create user mdb
 app.post("/api/users", async (req,res) =>{
    const body = req.body;

    if(
      !body ||
       !body.first_name ||
       !body.last_name ||
        !body.email ||
          !body.gender ||
           !body.job_title )
           {
           return res
           .status(400)
           .json({ status: "Bad request all field required"});
           }
   const result = await User.create({
      firstName: body.first_name ,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender,
      jobTitle: body.job_title,
    },
   );
    return res.status(201).json({
       msg: "successfuly inserted in mangodb", 
      });
 });
app.patch("/api/users/:id", async (req,res) =>{
   await User.findByIdAndUpdate(req.params.id, 
      { lastName: "Changed"}
   );
      return res.json({ status: "Success"});
 });
 app.delete("/api/users/:id", async(req,res) =>{
   await User.findByIdAndDelete(req.params.id)
      return res.json({ status: "Successed"});
 });


 // route

app.listen(8000, ()=> console.log(`rest api started..at ${PORT}`));