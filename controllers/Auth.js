const { fullError } = require("../middleware/Error");
// const {resetPassword,login} = require("../services/UserAuth")
// const Role = require("../models/Roles")
// const {Token,SuperAgentToken,AgentManagerToken,refresh_token} = require("../services/UserAuth")
const User = require("../models/User")
const bcrypt = require("bcryptjs");
const asynchandler = require("express-async-handler")
const {createSendToken,sendResetPasswordToken,changePassword} = require("../repos/token-repo")

const jwt = require("jsonwebtoken")

const getRoleName = async (role) => {
    const roleOfUser = await Role.findOne({where:{role:role}})
        return roleOfUser.name
}


const passwordRecovery = async (req,res) => {
    try {
        const {email} = req.body;
        resetPassword(email)
    } catch (error) {
        res.status(400).json({
            status:false,
            message:error.message,
            error:error.stack
        })
    }
}


const Login =  async (req,res) => {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(401).json({
            data:{
                status: false,
                message: 'Incorrect email or password',
            }
        });
      }
  
    if (user) {
        const userJson = user.toJSON();
        delete userJson.password;
         createSendToken(userJson,200,res)
   
    } else {
        return res.status(200).json({
            status:false,
            message:"incorrect email or password",
            data:{
                status:false,
            message:"invalid email or password",
            }
        });
    }
}


const ResetPassword = asynchandler( async (req,res)=> {
    const send = await sendResetPasswordToken(req.body.email)
    
    return res.status(200).json({
        status:true,
        message:"otp has been sent to your phonenumber",
        send
    });

})

const changePass = asynchandler( async (req,res)=> {

    const send = await changePassword(req.body.token,req.body.password)
    
    return res.status(200).json({
        status:true,
        message:"password reset successfully",
        send
    });

})



//     try {
        
     
//         if(!isMatch){
//             return res.status(400).json({
//                 status:false,
//                 message:"invalid credentials",
//             })
//         }
    
//         const roleName = await getRoleName(user.role_id)
//         if(user.role_id === 2){
//             const superagent = await Superagent.findOne({where:{user_id:user._id}})
//             const token =  SuperAgentToken(user,superagent.roleName,superagent._id,superagent.acquirer_id)
            
           
//             const userdetails = {
//                 name:user.name,
//                 email:user.email,
//                 roleName:user.roleName,
//                 status:user.status,
//                 ...superagent.dataValues
//             }
          
//            return res.status(200).json({
//                 status:true,
//                 message:"login sucessfully",
//                 token,
//                 data: userdetails,  
//             })
//         }
//         if(user.role_id === 3){
//             const manager = await Agentmanager.findOne({where:{user_id:user._id}})
//             const token =  AgentManagerToken(user,roleName,manager._id)
//             res.header('x-auth-token',token)
//             // res.cookie("token",token,{expires: new Date(Date.now() + 900000), httpOnly: true })
//             const userdetails = {
//                 name:user.name,
//                 email:user.email,
//                 roleName:user.roleName,
//                 status:user.status,
//                 ...manager.dataValues
//             }
//            return res.status(200).json({
//                 status:true,
//                 message:"login sucessfully",
//                 token,
//                 data:userdetails,  
//             })
//         }
//         const token = Token(user,roleName)

//         // req.session.isLogin = true
//         // req.session.user = isLogin.token
//         // console.log(error)
//         res.header('x-auth-token',token)
//         // res.cookie("token",token,{expires: new Date(Date.now() + 900000), httpOnly: true })
//         res.status(200).json({
//             status:true,
//             message:"login sucessfully",
//             token,
//             data:user
//         })
      
//     } catch (e) {
//         res.status(400).json({
//             status:false,
//             message:e.message,
//             error:e
//         })
//     }


// }

const refreshToken = async (req,res,next) => {
    const refreshToken = req.body.token;
    
try {
    if (refreshToken == null) return res.sendStatus(401);
  
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      const accessToken = refresh_token(user);
      res.json({ accessToken });
    });
  
    
} catch (error) {
    res.json({
        status:false,
        message:error.message
    })
}
}


module.exports = {
    passwordRecovery,
    refreshToken,
    Login,
    ResetPassword,
    changePass
}
   
