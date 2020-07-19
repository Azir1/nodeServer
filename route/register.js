const express = require('express')
const router = express.Router()
const parser = require('body-parser')
// md5加密
const crypto = require('crypto')
const urlParser = parser.urlencoded({ extended: false })
const Coluser = require('./db/userdb')
const jwt = require('jsonwebtoken')
// 注册
router.post('/register', urlParser, (req, res) => {
  const username = req.body.username
  const nickname = req.body.nickname
  let password = req.body.password
  // md5加密
  password = crypto.createHash('md5').update(password).digest('hex')
  Coluser.find({
    username
  }).then(ok => {
    if (ok.length > 0) {
      res.send({
        status: 304,
        msg: '用户名已经存在'
      })
    } else {
      const user = new Coluser({
        username,
        password,
        nickname
      })
      user.save().then(ok => {
        res.send({
          msg: '注册成功',
          status: 200
        })
      }).catch(err => {
        res.send({
          msg: '注册失败',
          status: 304
        })
      })
    }
  })
})
// 登录
router.post('/login', urlParser, (req, res) => {
  const uname = req.body.username
  let upass = req.body.password
  upass = crypto.createHash('md5').update(upass).digest('hex')
  Coluser.find({
    username: uname,
    password: upass
  }).then(ok => {
    if (ok.length > 0) {
      // payload承载的信息，可以把非敏感信息存在payload中，减少查库次数
      console.log(ok[0])
      let payload = {
        nickname: ok[0].nickname,
        username: ok[0].username
      }
      let key = 'asdfjk'
      const token = jwt.sign(payload, key,
        {
          expiresIn: 60 * 5 // 指定token生效的时间，5分钟
        }
      )
      res.send({
        msg: '登录成功',
        status: 200,
        token
      })
    } else {
      res.send({
        msg: '用户名或密码错误',
        status: 304
      })
    }
  })
})


module.exports = router
