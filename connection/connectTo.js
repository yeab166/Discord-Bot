const mongoose= require('mongoose');

async function connectToMongoDB(url){
  mongoose.connect(url)
  .then(()=>console.log("DataBase Connect Successfully!"))
  .catch((err)=>console.log("Error exist",err))
}

module.exports={
  connectToMongoDB,
}
