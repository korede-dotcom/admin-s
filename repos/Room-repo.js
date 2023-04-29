const Room = require('../models/Room');

class RoomRepository {
  async create(configData) {
      const config = await Room.create(configData);
      return config;
  }

  async findById(configId) {

      const config = await Room.findByPk(configId);
      return config;
  
  }

  async findAll() {

      const configs = await Room.findAll({ order: [['createdAt', 'DESC']]});
      return configs;
 
  }

  async findAllPending() {

      const configs = await Room.findAll({where:{status:false},order: [['createdAt', 'DESC']]});
      return configs;
    
  }

  async findAllPendingByBranch (branch) {
 
      const configs = await Room.findAll({where:{status:false,branch:branch},order: [['createdAt', 'DESC']]});
      return configs;
   
  }

  async findAllApprove() {

      const configs = await Room.findAll({where:{status:true}});
      return configs;
  
  }
  async findAllApproveByBranch (branch) {
  
      const configs = await Room.findAll({where:{status:true,branch:branch}});
      return configs;
   
  }

  async update(configId, newData) {
  
      const config = await this.findById(configId);
      const updatedConfig = await config.update(newData);
      return updatedConfig;
  
  }

  async delete(configId) {

      const config = await this.findById(configId);
      await config.destroy();
   
  }
}

module.exports = new RoomRepository();
