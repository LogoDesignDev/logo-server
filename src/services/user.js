const Dao = require('../daos/user');

class Service {
  static async getUserInfoByUid(uid) {
    let ret = await Dao.findByUid(uid);
    if (ret.length) {
      return {
        uid: ret[0].uId,
        username: ret[0].username,
        userPicUrl: ret[0].userPicUrl
      }
    } else {
      return null;
    }
  }
}

module.exports = Service;