const express = require('express')
const buyerController = require('../controller/buyer')
const router = express.Router();


router
    .get('/list-of-sellers',buyerController.getSellers)
    .get('/seller-catalog/:seller_id',buyerController.getCatalog)
    .post('/create-order/:seller_id',buyerController.book)
exports.buyerRoutes = router;