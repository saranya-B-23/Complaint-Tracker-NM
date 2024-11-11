const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://sabimasabima96182028:CUojDSPiUjMlQUcg@cluster0.mvzqy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
   console.log("connected to mongodb")
})