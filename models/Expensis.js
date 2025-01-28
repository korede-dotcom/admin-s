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
    foreignKey: true,
  },
  amount:{
    type: DataTypes.DOUBLE("amount","2"),
    defaultValue:0,
  },
  created_by:{
    type: DataTypes.STRING,
  },
  branch_id:{
    type: Sequelize.INTEGER,
    foreignKey: true,
  },
 
});



Expensis.sync({alter:true});

module.exports = Expensis;
