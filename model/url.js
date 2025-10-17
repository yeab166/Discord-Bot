const mongoose= require('mongoose');

const URLSchema= new mongoose.Schema({
  shortURL:{
    type: String,
    require:true,
    unique:true,
  },
  redirectURL:{
    type: String,
    require:true,
  },
  visitedHistory:[
    {timestamps:{
      type:Number,
    }}
  ]
},{timestamps:true})

const URL= mongoose.model('url',URLSchema);

module.exports=URL;
