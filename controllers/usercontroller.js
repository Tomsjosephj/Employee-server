const users= require("../Models/userschema")


//register logic


exports.userregister=async(req,res)=>{

    console.log(req.body);

    const file= req.file.filename

    const {fname,lname,mobile,email,gender,location,status}=req.body

    if(!fname || !lname ||!mobile || !email || !gender ||!location ||!status || !file){

        res.status(404).json("All inputs are required")
    }

    try{

        const preuser= await users.findOne({
            email
        })

        if(preuser){
            res.status(400 ).json("User already exists")
        }
        else{

            const newuser= new users({
                fname,lname,mobile,email,gender,location,status,profile:file

            })

            await newuser.save()

            res.status(200).json(newuser)

        }

    }
    catch(error){
        res.status(401).json(error)
    }

  

   // res.send("register request resolved")

}

//to get all users

exports.getalluser=async(req,res)=>{
           

    //get query parameter from request

    const search= req.query.search

    const query={
        fname:{$regex:search,$options:'i'}
    }


    try{
            const userdata= await users.find(query)
            res.status(200).json(userdata)
    }
    catch(error){

        res.status(404).json(error)

    }

}


exports.getuserdetail= async(req,res)=>{
    const {id}= req.params

    try{
        const singleuserdata= await users.findById(id)
        res.status(200).json(singleuserdata)

    }
    catch(error){
        res.status(404).json(error)
    }
}

exports.edituser= async(req,res)=>{

    const {id}= req.params

    const {fname,lname,mobile,email,gender,location,status,user_profile}=req.body

    const file=req.file? req.file.filename: user_profile

    try{
        const updateduser= await users.findByIdAndUpdate(id,{

            fname,lname,mobile,email,gender,location,status,profile:file

        },{
            new:true
        })
        await updateduser.save()

        res.status(200).json(updateduser)

    }
    catch(error){

        res.status(404).json(error)

    }

}

exports.deleteuser=async(req,res)=>{
    const {id}= req.params
     try{

     
    const deleteduser= await users.findByIdAndDelete(id)
      

    res.json(deleteduser)



     }catch(error){
        res.status(404).json(error)
     }
}