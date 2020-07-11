const Router = require('../utils/router').Router;
const Request = require('../utils/router').Request;
const Service = require('../services/user');

@Router('/user')
class User {
  @Request('/getUserInfoByUid', 'GET')
  async getUserInfoByUid(ctx, next) {
    try{
      let params = ctx.query;
      if (!params.uid) {
        ctx.body = {
          code: 501  // 参数错误
        };
      }

      let ret = await Service.getUserInfoByUid(params.uid);
      ctx.body = {
        code: ret ? 200 : 502,  // 找不到该用户
        ret
      };
    } catch (err) {
      ctx.body = {
        code: 510,  // 其他错误
        err
      };
    }
  }
}

module.exports = User;