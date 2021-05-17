const express = require('express');
const ordersControllers = require('../controllers/orders-controllers');
const {isAdmin, isAuth} = require('../middleware/check-auth');

const router = express.Router();


router.get('/',ordersControllers.getAllOrder);

router.post('/paypal/pay',ordersControllers.payment);

router.get('/paypal/success',ordersControllers.success);

router.get('/paypal/cancel',ordersControllers.cancel);

router.use(isAuth);

router.post('/addOrder', ordersControllers.addOrder );
 
router.post('/addOrderDetail', ordersControllers.addOrderDetail);

router.patch('/returnOrderDetail/:detailId',ordersControllers.returnDetail)

router.get('/myOrder',ordersControllers.getOrderByUserCode)

router.use(isAdmin);

router.patch('/updateOrder/:code',ordersControllers.updateOrderByCode)
router.patch('/updateStatus/:code',ordersControllers.updateStatus)



module.exports = router;