const { Sequelize, DataTypes } = require('sequelize');
const connectDb = require("../config/connectDB");
const sequelize = connectDb;

const Expensis = sequelize.define('expensis', {
  _id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    foreignKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  amount:{
    type: DataTypes.DOUBLE,
  
  },
  created_by:{
    type: DataTypes.STRING,
  },
  branch_id:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },
 
});



Expensis.sync({alter:true});

module.exports = Expensis;
