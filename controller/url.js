const URL= require('../model/url');
const ids= require('short-id');

async function handleCreateURL(req,res){
  const {url}= req.body;
  if(!url){
    res.status(400).json("error: URL is required!")
  }
  const shortId= ids.generate();
  await URL.create({
    shortURL:shortId,
    redirectURL:url,
    visitedHistory:[],
  })
  res.status(201).json({
    shortURL:shortId,
    redirectURL:url,
  })
}

async function handleGetShortURL(req,res){
  const shortURL= req.params.shortURL;
  const entry= await URL.findOneAndUpdate({
    shortURL,
  },{
    $push: {
    visitedHistory:{
     timestamps: Date.now(),
    },
  },
  },
   { new: true });
  if(!entry)
    res.status(404).json({error:"shortURL is not found."})

  res.redirect(entry.redirectURL);
}



module.exports={
  handleCreateURL,
  handleGetShortURL,
}
