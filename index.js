const express = require("express")
const app = express()
const routes = require("./routes/Index")
// const authRoute = require("./routes/Auth")
// const terminalRoute = require("./routes/Terminal")
// const walletRoute = require("./routes/Wallet")
// const rentalRoute = require("./routes/Rental")
// const commissionRoute = require("./routes/commmssion")
// const transactionRoute = require("./routes/Transaction")
// const managerRoute = require("./routes/Manager")
// const {addAllRoles} = require("./services/AddRoles")
// const AddRoles = require("./roles.json")
const connectDB = require("./config/connectDB")
const  cors = require('cors')
const path = require("path")
const {errorHandler} = require("./middleware/Error")
require("dotenv").config()
const { Sequelize } = require('sequelize');

app.use(cors());

(async () => {
  const {dbName,dbUser,dbPassword,dbHost,dbDialect} = process.env
 const conect = new Sequelize(dbName,dbUser,dbPassword, {
      host: dbHost,
      dialect: dbDialect,
      logging: false,
      pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000, 
          
      }
      
  });
  await conect.authenticate().then(() => {
      console.log(
        "jhgfd"
      )
    }).catch(rr => console.log(rr));
  // await connectDB.authenticate().then(() => {
  //     console.log('DB Connected...'); 
  // }).catch(err => {
  //     console.log(err);
  // })
})();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.Router())

app.use('/uploads', express.static(path.join(__dirname,"uploads")));





app.use(routes)

app.use(errorHandler)

const port = process.env.Port || 9800

app.listen(port,()=> console.log(`server running on ${port}`))


