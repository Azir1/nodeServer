// 电影页面的路由
const express = require('express')
const router = express.Router()
const homeData = require('../data/home.json')
const storeData = require('../data/store_home.json')
const foundData = require('../data/found.json')
const taocan = require("../data/taocan.json")
const order = require("../data/order.json")
const attention = require("../data/attention.json")
router.get('/home', (req, res) => {
  res.send({
    msg: '请求成功',
    data: homeData
  })
})
router.get('/store', (req, res) => {
  res.send({
    msg: '请求成功',
    data: storeData
  })
})
router.get('/found', (req, res) => {
  res.send({
    msg: '请求成功',
    data: foundData
  })
})
router.get('/taocan', (req, res) => {
  res.send({
    msg: '请求成功',
    data: taocan
  })
})
router.get('/order', (req, res) => {
  res.send({
    msg: '请求成功',
    data:order
  })
})
router.get('/attention', (req, res) => {
  res.send({
    msg: '请求成功',
    data:attention
  })
})
module.exports = router