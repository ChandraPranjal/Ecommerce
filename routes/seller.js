const express = require('express')
const sellerController = require('../controller/seller')
const router = express.Router();


router
    .post('/create-catalog',sellerController.createCatalog)
    .get('/orders',sellerController.getOrders)

exports.sellerRoutes = router;