const express = require('express');
const { check } = require('express-validator');
const fileUpload = require('../middleware/file-upload');
const ordersControllers = require('../controllers/orders-controllers');
const {isAdmin, isAuth} = require('../middleware/check-auth');

const router = express.Router();


router.get('/',ordersControllers.getAllOrder);
router.post('/paypal/pay',ordersControllers.payment);
router.get('/paypal/success',ordersControllers.success);
router.get('/paypal/cancel',ordersControllers.cancel);
// router.get('/:orderId',ordersControllers.getOrderByProductId)
router.use(isAuth);
router.post(
    '/addOrder',
    [   
       check('orderCode').not().isEmpty(),
       check('address').not().isEmpty(),
       check('total').not().isEmpty()
       
    ],
    ordersControllers.addOrder
 );
 
router.post(
    '/addOrderDetail',
    ordersControllers.addOrderDetail
)
router.patch('/returnOrderDetail/:detailId',ordersControllers.returnDetail)
router.get('/myOrder',ordersControllers.getOrderByUserID)

router.use(isAdmin);

router.patch('/updateOrder/:orderId',ordersControllers.updateOrderById)



module.exports = router;