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
   * 通过uid查找作品
   * @param {*} params 查询参数
   */
  static async findByUid(params) {
    let conn = await this.getConnection();
    let skip = (params.pageSize && params.pageIndex) ? (params.pageSize * (params.pageIndex - 1)) : 0;
    let limit = params.pageSize ? Number(params.pageSize) : 6;

    let filter = { 
      uId: params.uid
    };
    let options = {
      projection: {
        logoList: 1,
        _id: 0
      }
    };

    let ret = await conn.find('user', filter, options);
    if (ret.length) {
      return {
        count: ret[0].logoList.length,
        logoList: ret[0].logoList.slice(skip, skip + limit)
      }
    } else {
      return {
        count: 0,
        logoList: []
      };
    }
  }
}

module.exports = Dao;