// 电影页面的路由
const express = require('express')
const router = express.Router()
const Coldouban = require('./db/filmdb')
router.get('/filmlist', (req, res) => {
  Coldouban.find()
    .then(ok => {
      // console.log(ok)
      res.send({
        msg: '请求成功',
        data:ok
      })
    })
    .catch(err=>{
      console.log(err)
      res.send({
        msg:'请求出错了'
      })
    })

})

module.exports = router