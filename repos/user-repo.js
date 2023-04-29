const User = require('../models/User');
const Manager = require("../models/Manager")
const bcrypt = require("bcryptjs")
const connectDB = require("../config/connectDB");
const Branch = require('../models/Branch');
class UserRepository {
    async create(user) {
      console.log("🚀 ~ file: user-repo.js:8 ~ UserRepository ~ create ~ user:", user)
      let transaction
      transaction = await connectDB.transaction()
    try {

      const createdUser = await User.create(user,{transaction});
      const saveManager = await Manager.create({user_id:createdUser._id,branch_id:user.branch_id,phonenumber:user.phonenumber,address:user.address,state:user.state},{transaction})
      transaction.commit()
      return createdUser.toJSON();
    } catch (err) {
      console.error('Error creating user:', err);
      throw err;
    }
  }

  async getById(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error(`User with id ${id} not found`);
      }
      return user.toJSON();
    } catch (err) {
      console.error(`Error getting user with id ${id}:`, err);
      throw err;
    }
  }

  async getAll() {
    Manager.belongsTo(User,{foreignKey:'user_id'})
    Manager.belongsTo(Branch,{foreignKey:'branch_id'})
    try {

      const users = await Manager.findAll({include:[{model:User},{model:Branch}], order: [['createdAt', 'DESC']]});
      
      
      return users.map(user => user.toJSON());
    } catch (err) {
      throw err;
    }
  }

  async getAllPending() {
    Manager.belongsTo(User,{foreignKey:'user_id'})
    Manager.belongsTo(Branch,{foreignKey:'branch_id'})
    try {

        const users = await Manager.findAll({
            include: [
              {
                model: User,
                where: {
                  status: "false",
                  enabled: false,
                  verified: false
                },
                include: [],
              },
              {
                model: Branch,
                include: [],
              },
            ]
          });      
      return users.map(user => user.toJSON());
    } catch (err) {
      throw err;
    }
  }

 async approve (id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return null;
      }
      const updatedUser = await User.update({status:"true"},{where:{_id:id},returning:true});
   
      return updatedUser[1][0].dataValues;
    } catch (error) {
      throw new Error(error);
    }
  };

  async update(id, updatedFields) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error(`User with id ${id} not found`);
      }
      await user.update(updatedFields);
      return user.toJSON();
    } catch (err) {
      console.error(`Error updating user with id ${id}:`, err);
      throw err;
    }
  }

  async delete(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error(`User with id ${id} not found`);
      }
      await user.destroy();
      return user.toJSON();
    } catch (err) {
      console.error(`Error deleting user with id ${id}:`, err);
      throw err;
    }
  }


  
  
}

module.exports = new UserRepository();
