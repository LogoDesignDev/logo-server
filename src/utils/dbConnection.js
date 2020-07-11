const mongodb = require('mongodb');

const URL = 'mongodb://root1:password@47.115.52.184:27017/logo';

class DbConnection{
  constructor () {
    this.conn = null;
  }
  /**
   * 获取db连接（返回promise）
   */
  connect() {
    return new Promise((resolve, reject) => {
      mongodb.MongoClient.connect(URL, { useNewUrlParser: true }, (err, db) => {
        if (err) {
          reject(err);
        } else {
          this.conn = db.db('logo');
          resolve(this.conn);
        }
      });
    })
  }

  /**
   * 封装find方法（返回promise）
   * @param {*} collection 集合名
   * @param {*} filter 查询条件
   * @param {*} projection 指定字段
   */
  find(collectionName, filter, options){
    return new Promise((resolve, reject) => {
      this.conn.collection(collectionName).find(filter, options).toArray((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      })
    })
  }
}


module.exports = DbConnection