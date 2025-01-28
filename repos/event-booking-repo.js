const { Op,Sequelize } = require('sequelize');
const EventBooking = require('../models/EventBookers');
const EventConfig = require("../models/EventConfig");
const Branch = require('../models/Branch');

class EventBookingRepository {
  async getAll() {
    // EventBooking.belongsTo(EventConfig,{foreignKey:"event_type",targetKey:"_id"})
    EventBooking.belongsTo(Branch,{foreignKey:"branch_id",targetKey:"_id"})
    return await EventBooking.findAll({include:[/*{model:EventConfig}*/{model:Branch}]});
  }

  async getById(id) {
    return await EventBooking.findByPk(id);
  }
  async getByDate(id,start,end) {
    // EventBooking.belongsTo(EventConfig,{foreignKey:"event_type",targetKey:"_id"})
    // EventBooking.belongsTo(Branch,{foreignKey:"branch_id",targetKey:"_id"})
    // return await EventBooking.findAll({where:{branch_id:id},include:[{model:EventConfig},{model:Branch}]});
    
  return await EventBooking.findAll({
    where: {
      branch_id: id,
      date: {
        [Op.gte]: start, // Date is greater than or equal to `start`
        [Op.lte]: end,   // Date is less than or equal to `end`
      },
    },
    include: [
   // Include specific fields from EventConfig
      { model: Branch, attributes: ['_id', 'name'] },      // Include specific fields from Branch
    ],
    // attributes: [
    //   '_id', 
    //   'first_name', 
    //   'last_name', 
    //   'email', 
    //   'phone_number', 
    //   'address', 
    //   'reference_id', 
    //   'payment_mode', 
    //   'amount', 
    //   'date',
    //   [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalAmount'], // Aggregate total amount
    // ],
    // group: [
    //   'eventbooking._id',
    //   'EventConfig._id',
    //   'Branch._id',
    // ], // Group by necessary fields
  });
  }
  async getByDateAll(start,end) {
    // EventBooking.belongsTo(EventConfig,{foreignKey:"event_type",targetKey:"_id"})
    EventBooking.belongsTo(Branch,{foreignKey:"branch_id",targetKey:"_id"})
    // return await EventBooking.findAll({where:{},include:[{model:EventConfig},{model:Branch}]});
    
    return await EventBooking.findAll({
      where: {
        date: {
          [Op.gte]: start, // Date is greater than or equal to `start`
          [Op.lte]: end,   // Date is less than or equal to `end`
        },
      },
      include: [
        // { model: EventConfig }, // Include EventConfig
        { model: Branch },      // Include Branch
      ],
      // attributes: [
      //   '_id', 
      //   'first_name', 
      //   'last_name', 
      //   'email', 
      //   'phone_number', 
      //   'address', 
      //   'reference_id', 
      //   'payment_mode', 
      //   'amount', 
      //   'date',
      //   [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalAmount'], // Aggregate total amount
      // ],
      // group: [
      //   'eventbooking._id',
      //   'eventbooking.first_name',
      //   'eventbooking.last_name',
      //   'eventbooking.email',
      //   'eventbooking.phone_number',
      //   'eventbooking.address',
      //   'eventbooking.reference_id',
      //   'eventbooking.payment_mode',
      //   'eventbooking.amount',
      //   'eventbooking.date',
      //   'eventconfig._id', // Include primary key or unique identifier for EventConfig
      //   'branch._id',      // Include primary key or unique identifier for Branch
      // ],
    });
    
  }
  async getByBranchId(id) {
    // EventBooking.belongsTo(EventConfig,{foreignKey:"event_type",targetKey:"_id"})
    EventBooking.belongsTo(Branch,{foreignKey:"branch_id",targetKey:"_id"})
    return await EventBooking.findAll({where:{branch_id:id},include:[{model:EventConfig},{model:Branch}]});
  }

  async create(eventBooking) {
    return await EventBooking.create(eventBooking);
  }

  async checkDate (date,branch_id) {
   return EventBooking.findOne({
      where: {
        date: date,
        branch_id:branch_id
      },
    });
  }

  async update(id, eventBooking) {
    const foundEventBooking = await EventBooking.findByPk(id);
    if (!foundEventBooking) {
      return null;
    }
    return await foundEventBooking.update(eventBooking);
  }

  async delete(id) {
    const foundEventBooking = await EventBooking.findByPk(id);
    if (!foundEventBooking) {
      return null;
    }
    await foundEventBooking.destroy();
    return foundEventBooking;
  }

  async eventCount (type) {
    switch (type) {
      case cash:
        const countCash = await EventBooking.count({where:{payment_mode:type}});
        return countCash;
        break;  
      default:
        const count = await EventBooking.count();
        return count;
        break;
    }

  }
  async eventCountByBranch (id) {
        const countCash = await EventBooking.count({where:{branch_id:id}});
        return countCash;
  }
}



module.exports = EventBookingRepository;
