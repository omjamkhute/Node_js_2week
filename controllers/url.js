// const shortid = require('shortid');
// const URL = require('../models/url');

// async function handleGenerateNewShortURL(req,res) {
//     const body = req.body;
//     if(!body.url) 
//         return res.status(400)
//     .json({ error: 'url is required '})

//     const shortID = shortid();

//     await URL.create({
//         shortId : shortID,
//         redirectURL: body.url,
//         visitedHistory : [], 
//     });
//     return res.render('home',{
//     })
//          id: generatedId,     // the short URL id generated
//          urls: urlsArray,
//     });

// }
 
// async function handleGetAnalytics(req, res){
    
//      const shortId = req.params.shortId;
//     const result = await URL.findOne({ shortId});
//      return res.json({ totalClicks: result.visitedHistory.length,
//         analytics: result.visitedHistory,
//      })
// }

// module.exports = {
//   handleGenerateNewShortURL,
//   handleGetAnalytics,
// };

const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: 'url is required' });
    }

    const shortID = shortid();

    // Create the new shortened URL entry in your database
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitedHistory: [],
          createdBy: req.user._id,
    });

    // Fetch all URLs to display in the table (optional, depending on your UI)
    // const urlsArray = await URL.find();

    // Render your EJS home page with the new short ID and all URLs
    return res.render('home', {
        id: shortID,
    });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    if (!result) {
        return res.status(404).json({ error: 'URL not found' });
    }
    return res.json({
        totalClicks: result.visitedHistory.length,
        analytics: result.visitedHistory,
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
};
