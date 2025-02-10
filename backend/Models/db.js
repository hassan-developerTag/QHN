const mongoose=require("mongoose")

const mongo_url=process.env.MONGO_URI

mongoose.connect(mongo_url).then(()=>{
    console.log("MongooDB Connected.......")
}).catch((err)=>{
    console.log("MongoDb Erorr: ",err)
})