const jwt = require('jsonwebtoken')
const verify = (req, res, next) => {
  // 登录注册是不需要拦截的
  if (req.path == ('/user/login') || req.path == ('/user/register')) {
    next() //next的作用，将控制权释放给下一个中间件，中间件的本质就是一个函数
  } else { //校验，token携带在请求头中
    let token = req.headers['token'] /* || req.body['token'] || req.query.token
    console.log(token) */
    //解密
    let key = 'asdfjk'
    jwt.verify(token, key, (err, ok) => {
      if (err) {
        res.send({
          state: 304, //服务器收到请求，但是拒绝响应
          msg: '无效的验证'
        })
      } else {
        next()
      }
    })
  }
}

module.exports = verify