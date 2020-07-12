const request = require('../utils/request');
const Dao = require('../daos/personal');

class Service {
  /**
   * 通过uid查找作品
   * @param {*} params 查询参数
   */
  static async getUserProdsByUid(params) {
    return await Dao.findByUid(params);
  }

  /**
   * 通过查询是否有关注某些用户
   * @param {*} params 查询参数
   */
  static async hasFollowed(params) {
    let retData = {};
    params.othersUidList.forEach((item) => {
      retData[item] = false;
    })

    let res = await request.post(
      '/personal/getFollowList',
      { uid: params.uid }
    );
    let data = res.data;
    if (data.code === 200) {
      let followList = data.followList.map((item) => item.uid);
      for (let uid in retData) {
        followList.includes(uid) && (retData[uid] = true)
      }
    }

    return retData;
  }
}

module.exports = Service;