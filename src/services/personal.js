const Dao = require('../daos/personal');

class Service {
  /**
   * 通过uid查找作品
   * @param {*} params 查询参数
   */
  static async getUserProdsByUid(params) {
    return await Dao.findByUid(params);
  }
}

module.exports = Service;