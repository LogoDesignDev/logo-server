const koaRouter = require('koa-router');

/**
 * 类修饰器
 * @param {*} prefix 请求url前缀
 */
function Router(prefix) {
  let router = new koaRouter();
  router.prefix(prefix || '/');

  return function (target) {
    let fnList = Object.getOwnPropertyDescriptors(target.prototype);
    for (let fnName in fnList) {
      if (fnName !== 'constructor') {
        let fn = fnList[fnName].value;
        // 这里就是给下面的Request传入router
        fn(router);
      }
    }

    return router;
  }
}

/**
 * 类方法修饰器
 * @param {*} url 请求地址
 * @param {*} method 请求方法
 */
function Request(url, method) {
  return function (target, name, descriptor) {
    let fn = descriptor.value;
    descriptor.value = (router) => {
      router[method.toLowerCase()](url, async (ctx, next) => {
        await fn(ctx, next);
      })
    }
  }
}

module.exports = { 
  Router,
  Request
};