const express = require("express")
const dotenv = require("dotenv").config()
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

app.use(cors());

(async () => {
  await connectDB.authenticate().then(() => {
      console.log('DB Connected...'); 
  }).catch(err => {
      console.log(err);
  })
})();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.Router())

app.use('/uploads', express.static(path.join(__dirname,"uploads")));


app.use(routes)

app.use(errorHandler)


const port = 9800
app.listen( port,()=> console.log(`server running on ${port}`))


