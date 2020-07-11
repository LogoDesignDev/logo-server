const DbConnection = require('../utils/dbConnection');

class Dao {
  /**
   * 获取数据库连接
   */
  static async getConnection() {
    let conn = new DbConnection();
    await conn.connect();

    return conn;
  }

  /**
   * 通过uid查询用户
   * @param {*} uid 用户id
   */
  static async findByUid(uid) {
    let conn = await this.getConnection();

    return await conn.find('user', { uId: uid });
  }
}

module.exports = Dao;