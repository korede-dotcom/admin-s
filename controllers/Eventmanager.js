const EventConfigRepository = require("../repos/eventmanager-repo")
const asynchandler = require("express-async-handler")

const getPkgs = asynchandler( async (req,res) => {
    const pkgs = await EventConfigRepository.getAllEventConfigs()
    return res.status(200).json({
        status:200,
        message:"pkgs fetched",
        data:{
            pkgs
        }
    })
});

const approve = asynchandler( async (req,res) => {

    const pkgs = await EventConfigRepository.approve(req.query.id)
    return res.status(200).json({
        status:200,
        message:"pkgs fetched",
        data:{
            pkgs
        }
    })
});


const getActivePkgs = asynchandler( async (req,res) => {
    
    if (req.user) {
        const pkgs = await EventConfigRepository.getAllEventConfigsActiveBybranch(req.user.branch)
        return res.status(200).json({
            status:200,
            message:"pkgs fetched",
            data:{
                pkgs
            }
        })
        
    } else {
        console.log("🚀 ~ file: eventmanager.js:42 ~ getActivePkgs ~ req.query.branchid:", parseInt(req.query.branchid))
        const pkgs = await EventConfigRepository.getAllEventConfigsActive(parseInt(req.query.branchid))
        return res.status(200).json({
            status:200,
            message:"pkgs fetched",
            data:{
                pkgs
            }
        })
        
    }
});

const active = asynchandler(async (req,res) => {
    const pkgs = await EventConfigRepository.getAllEventConfigsActive()
        return res.status(200).json({
            status:200,
            message:"pkgs fetched",
            data:{
                pkgs
            }
        })
})

const getPendingPkgs = asynchandler( async (req,res) => {
    if (req.user) { 
        const pkgs = await EventConfigRepository.getAllEventConfigsPendingByBranch(req.user.branch)
        return res.status(200).json({
            status:200,
            message:"pkgs fetched",
            data:{
                pkgs
            }
        })
        
    } else {
        const pkgs = await EventConfigRepository.getAllEventConfigsPending()
        return res.status(200).json({
            status:200,
            message:"pkgs fetched",
            data:{
                pkgs
            }
        })
        
    }
});

const createeventpkg = asynchandler( async (req,res) => {
    const createeventpackage = await EventConfigRepository.createEventConfig({...req.body,status:false})
    return res.status(200).json({
        status:200,
        message:"event package ",
        data:{
            createeventpackage
        }
    })
});

const updateeventpkg = asynchandler( async (req,res) => {
    const createeventpackage = await EventConfigRepository.updateEventConfig(req.query.id,{...req.body,status:false})
    return res.status(200).json({
        status:200,
        message:"event package updated ",
        data:{
            createeventpackage
        }
    })
});






module.exports = {
    getPkgs,
    createeventpkg,
    updateeventpkg,
    getActivePkgs,
    getPendingPkgs,
    approve,
    active

};


