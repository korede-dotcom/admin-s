

const { Sequelize, DataTypes } = require('sequelize');
const connectDb = require("../config/connectDB");
const sequelize = connectDb;

const HotelBooking = sequelize.define('hotelbooking', {
     title: {type:DataTypes.STRING,allowNull:true},
    start: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    guest_name: {
       type: DataTypes.STRING,
       allowNull:false
    },
    guest_email: {
        type:DataTypes.STRING,
        allowNull:false
    },
    guest_phone:{
        type:DataTypes.STRING,
        allowNull:false
    },
    room_id:{
        type: Sequelize.INTEGER,
        foreignKey: true,
    },
    guest_address:{
        type:DataTypes.STRING,
        allowNull:false
    },
    guest_count: {
        type:DataTypes.INTEGER,
        allowNull:false
    },
    payment_mode:{
        type:DataTypes.ENUM("card","cash","free","cheque","transfer","scanbank")
    },
    reference_id:{
        type: DataTypes.STRING,
        allowNull: false,
      }
});

HotelBooking.sync()

module.exports = HotelBooking;