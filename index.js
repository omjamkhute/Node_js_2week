const express = require('express');
const {  connectToMongoDB } = require('./connect')
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const shortid = require('shortid');
const staticRoute = require('./routes/staticRouter');
const path = require('path');
//const { exp } = require('firebase/firestore/pipelines');
// create app
const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => console.log('db connected'));
// tell express which engin
app.set("view engine", "ejs");
app.set('views', path.resolve('./views'));
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
//test

// router
app.use('/url', urlRoute);
app.use("/",staticRoute);
// get
app.get('/:shortId', async (req,res) =>{
   const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
     { 
        $push: {
            visitedHistory: {
                timestamp: Date.now(),
            },
   },
}
)
   res.redirect(entry.redirectURL);
})
// server listen
app.listen(PORT ,() => console.log(`${PORT} ACTIVATED`));