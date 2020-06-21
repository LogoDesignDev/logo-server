const Router = require('../utils/router').Router;
const Request = require('../utils/router').Request;
const DbConnection = require('../utils/dbConnection');

@Router('/personal')
class Personal {
  @Request('/test', 'get')
  async name(ctx, next) {
    const conn = new DbConnection();
    await conn.connect();
  
    const res = await conn.find('user');
    ctx.body = {
      res
    };
  }
}

module.exports = Personal;