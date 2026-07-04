const express = require('express');
const {  connectToMongoDB } = require('./connect')
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const shortid = require('shortid');
//const { exp } = require('firebase/firestore/pipelines');
// create app
const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => console.log('db connected'));

// middlewares
app.use(express.json());
// router
app.use('/url', urlRoute);

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