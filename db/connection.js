const mongoose= require('mongoose')

const DB= process.env.DATABASE

mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("Mongo DB Connected");
}).catch((err)=>{
console.log(err);
})

