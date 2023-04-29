const { Sequelize, DataTypes } = require('sequelize');
const connectDb = require("../config/connectDB");
const sequelize = connectDb;

const Room = sequelize.define('room', {
  _id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    foreignKey: true,
    autoIncrement: true,
  },
  room_number: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
  },
  room_name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2), // 10 digits before the decimal point, 2 digits after
    allowNull: false,
  },
  num_beds: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  number_of_guests: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  has_wifi: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue:false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  service_id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    foreignKey: true,
  },
  branch:{
    type: Sequelize.INTEGER,
    foreignKey: true,
  },
  picture:{
    type:DataTypes.ARRAY(DataTypes.STRING),
    allowNull:true
  },
  status:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
  }


 
});



Room.sync();

module.exports = Room;
