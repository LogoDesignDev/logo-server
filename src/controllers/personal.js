const Router = require('../utils/router').Router;
const Request = require('../utils/router').Request;
const Service = require('../services/personal');

@Router('/personal')
class Personal {
  @Request('/getUserProdsByUid', 'GET')
  async getUserProdsByUid(ctx, next) {
    try{
      let params = ctx.query;
      if (!params.uid) {
        ctx.body = {
          code: 501  // 参数错误
        };
      }

      let ret = await Service.getUserProdsByUid(params);
      ctx.body = {
        code: 200,
        ret
      };
    } catch (err) {
      ctx.body = {
        code: 510,  // 其他错误
        err
      };
    }
  }

  @Request('/hasFollowed', 'GET')
  async hasFollowed(ctx, next) {
    try{
      let params = ctx.query;
      if (!params.uid || !params.othersUidList ) {
        ctx.body = {
          code: 501  // 参数错误
        };
      }
      params.othersUidList = params.othersUidList.split('|')

      let ret = await Service.hasFollowed(params);
      ctx.body = {
        code: 200,
        ret
      };
    } catch (err) {
      console.log(err)
      ctx.body = {
        code: 510,  // 其他错误
        err
      };
    }
  }
}

module.exports = Personal;