const hotelConfigRepository = require("../repos/Room-repo")
const asynchandler = require("express-async-handler")
const cloudinaryRepo = require("../repos/cloudinary")

const getPkgs = asynchandler( async (req,res) => {
    
    const pkgs = await hotelConfigRepository.findAll()
    return res.status(200).json({
        message:"hotel pkgs fetched",
        data:{
            pkgs
        }
    })
});

const getActivePkgs = asynchandler( async (req,res) => {
    if(req.user){
        const pkgs = await hotelConfigRepository.findAllApproveByBranch(req.user.branch)
        return res.status(200).json({
            message:"hotel pkgs fetched",
            data:{
                pkgs
            }
        })
        
    }else{
        const pkgs = await hotelConfigRepository.findAllActive()
        return res.status(200).json({
            message:"hotel pkgs fetched",
            data:{
                pkgs
            }
        })
    }
});

const getPendingPkgs = asynchandler( async (req,res) => {
    if(req.user){
        const pkgs = await hotelConfigRepository.findAllPendingByBranch(req.user.branch)
        return res.status(200).json({
            message:"hotel pkgs fetched",
            data:{
                pkgs
            }
        })
    }else{
        const pkgs = await hotelConfigRepository.findAllPending()
        return res.status(200).json({
            message:"hotel pkgs fetched",
            data:{
                pkgs
            }
        })

    }
});

const approve = asynchandler( async (req,res) => {
    if(!req.query.id){
        return res.status(400).json({
            status:false,
            message:"please pass id",
        
        })
    }
    const pkgs = await hotelConfigRepository.approve(req.query.id)
    return res.status(200).json({
        message:"hotel pkgs fetched",
        data:{
            pkgs
        }
    })
});

const createhotelpkg = asynchandler(async (req,res) => {
 
  const upload = await cloudinaryRepo.uploadMany(req.files)
  console.log("🚀 ~ file: Hotelmanager.js:77 ~ createhotelpkg ~ upload:", upload)
   const imageObject = upload.map(url => {
       return {        
           secure_url: url.secure_url,
           url:url.url
           
       }

   });
   if(req.user.role_id === 1){
    const createeventpackage = await hotelConfigRepository.create({...req.body,status:true,picture:[...imageObject.map(r => r.secure_url)]})
    return res.status(200).json({
        status:true,
        message:"hotel roomn created ",
        data:{
            createeventpackage
        }
    })
   }

    const createeventpackage = await hotelConfigRepository.create({...req.body,status:false,picture:[...imageObject.map(r => r.secure_url)]})
    return res.status(200).json({
        status:true,
        message:"hotel roomn created ",
        data:{
            createeventpackage
        }
    })
});

const updatehotelmpkg = asynchandler( async (req,res) => {
    const createeventpackage = await hotelConfigRepository.update(req.query.id,{...req.body,status:false})
    return res.status(200).json({
        message:"event hotel package updated ",
        data:{
            createeventpackage
        }
    })
});



module.exports = {
    getPkgs,
    createhotelpkg,
    updatehotelmpkg,
    getActivePkgs,
    getPendingPkgs,
    approve

};


