const { Sequelize, DataTypes } = require('sequelize');
const connectDb = require("../config/connectDB");
const sequelize = connectDb;

const EventBooking = sequelize.define('eventbooking', {
  _id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  reference_id:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  payment_mode:{
    type:DataTypes.ENUM("card","cash","free","cheque","transfer","scanbank"),
    defaultValue:"card"
},
});

EventBooking.sync();

module.exports = EventBooking;
