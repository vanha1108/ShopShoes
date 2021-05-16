const Category = require('../models/category');
const Brand = require('../models/brand');
const Product = require('../models/product');
const Promotion = require('../models/promotion');
const User = require('../models/user');
const Order = require('../models/order');
const OrderDetail = require('../models/orderdetail');
const ProductSize = require('../models/productsize');
const Size = require('../models/size');
const user = require('../models/user');
const Util = require('../utils/generateCode');
const { create_payment, execute_payment } = require('../middleware/paypal');
const paypal = require('paypal-rest-sdk');



const getAllOrder = async (req, res, next) => {
    let orders;
    try {
        orders = await Order.find();
    } catch (err) {
        return res.status(500).json({code: 500, success: false, message: "System went wrong, coud not find any order!"});
    }
    if (!orders) {
        return res.status(404).json({code: 404, success: false, message: "Could not find any order!"});
    }
    return res.status(200).json({ code: 200, success: true, orders });
}

const addOrder = async (req, res, next) => {
    const {fullName, address, promotionCode, totalPrice, phone, payment} = req.body;

    let users;
    let userCurrent = req.userData.email;

    try {
        users = await User.findOne({ email: userCurrent });
    } catch (err) {
        return res.status(401).json({code: 401, success: false, message: "You are not log in. Pls login!"});
    }

    if (!users) {
        return res.status(404).json({code: 404, success: false, message: "Could not find any order!"});
    }

    var code = Util.getCode();
    while(!Order.findOne({code})) {
        code = Util.getCode();
    };

    const orderCreated = {
        code: code,
        address: address,
        promotionCode: promotionCode,
        totalPrice: totalPrice,
        status: 1,          //trạng thái 1 (Đã đặt hàng)
        userCode: users.code,
        fullName: fullName,
        phone: phone,
        address: address,
        totalPrice: totalPrice,
        payment: payment
    }
    let createOrder = await Order.create(orderCreated);
    return res.status(200).json({ code: 200, success: true, createOrder });
}

const updateOrderByCode = async (req, res, next) => {
    const code = req.params.code;
    const {fullName, address, phone, status} = req.body;

    let order = await Order.findOne({code});
    if(order == null) {
        return res.status(404).json({code: 404, success: false, message: "Could not find any order!"});
    } 

    order.address = address;
    order.status = status;
    order.phone = phone;
    order.fullName = fullName;

    await Order.updateOne(order, { code: code });

    if (req.body.status === 4)            //1: Đã đặt, 2: Đã Duyệt, 3:Đã Thanh Toán, 4: Đã Nhận Hàng
    {
        let orderByCode = await Order.findOne({code});

        const userUpdated = {
            totalPrice: orderByCode.totalPrice
        }
        await User.updateOne(userUpdated, { code: orderByCode.userCode });
    }
    return res.status(200).json({code: 200, success: true, order });
}

const addOrderDetail = async (req, res, next) => {
    const {amount, price, productSizeCode, orderCode} = req.body;
    let orderItem;

    let findProductSize = await ProductSize.findOne({ code: productSizeCode });
    if (findProductSize == null) {
        return res.status(404).json({code: 404, success: false, message: "Could not find any productSize!"});
    }

    let findOrder = await Order.findOne({code: orderCode});
    if (findOrder == null) {
        return res.status(404).json({code: 404, success: false, message: "Could not find any order!"});
    }

    let amountProductSize = findProductSize.productCount - amount;

    var code = Util.getCode();
    while(!OrderDetail.findOne({code})) {
        code = Util.getCode();
    };

    try {
        const orderDetails = {
            code: code,
            productSizeCode: productSizeCode,
            orderCode: orderCode,
            amount: amount,
            price: price
        };
        orderItem = await OrderDetail.create(orderDetails);

        await ProductSize.updateOne({ productCount: amountProductSize }, { code: productSizeCode });
        return res.status(200).json({ code: 200, success: true, orderItem });
    } catch (err) {
        return res.status(500).json({code: 500, success: false, message: "System went wrong!"});
    }
}

const returnDetail = async (req, res, next) => {
    const detailId = req.params.detailId;
    const orderDetailReturn = {
        isReturn: true
    };


    let orderDetails;
    try {
        orderDetails = await OrderDetail.updateOne(orderDetailReturn, { id: detailId });

        let orderDetailReturned;
        orderDetailReturned = await OrderDetail.findById(detailId);
      
        let orderByDetailId;
        let promoteCode;
        let promotionValue = 0;

        try {
            orderByDetailId = await Order.findById(orderDetailReturned.orderId);
            promoteCode = orderByDetailId.promotionCode;

            if (promoteCode !== null) {
                let promotion;
                promotion = await Promotion.findOne({ promotionCode: promoteCode });

                promotionValue = promotion.promotionValue;
            }
        }
        catch {

        }
        let orderReturn;
        orderReturn = await Order.findById(orderDetailReturned.orderId);

        let orderPriceUpdate
        orderPriceUpdate = parseFloat(orderReturn.totalPrice) - (parseFloat(orderDetailReturned.unitPrice * orderDetailReturned.unitAmount) * parseFloat(1 - parseFloat(promotionValue)));

        const totalPriceUpdate = {
            totalPrice: orderPriceUpdate
        }

        let orderUpdate;
        orderUpdate = Order.updateOne(totalPriceUpdate, { id: orderDetailReturned.orderId })

    } catch (err) {
        const error = new HttpError('There is system error. Pls try again', 500);
        return next(error);
    }
    res.status(200).json({ success: true });
}
const payment = async (req, res, next) => {
    const itemsList = JSON.parse(req.body.itemsList)

    let total;
    total = 0;
    for (i = 0; i < itemsList.length; i++) {
        total += parseFloat(itemsList[i].price) * parseFloat(itemsList[i].quantity);
    }

    create_payment(itemsList, total);
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.status(200).json({link : payment.links[i].href});
                }
            }
        }
    });
}


const success = async (req, res, next) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    execute_payment(payerId)
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {

            var responseHTML = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'
        responseHTML = responseHTML.replace('%value%', JSON.stringify({
            message: "Success", errorCode: 0
        }));
        res.status(200).send(responseHTML);
            // console.log((payment));
            // res.status(200).json({ message: "Success", errorCode: 0 })
        }
    });
}

const cancel = async (req, res, next) => {
    return res.status(200).json({ message: "Cancel", errorCode: 1 })
}

const getOrderByUserCode = async (req, res, next) => {
    let users;
    let userCurrent = req.userData.email;

    try {
        users = await User.findOne({ email: userCurrent });
    } catch (err) {
        return res.status(500).json({code: 500, success: false, message: "System went wrong!"});
    }

    if (!users) {
        return res.status(404).json({code: 404, success: false, message: "Could not find any users!"});
    }

    let orders = await Order.find({ userCode: users.code });
    return res.status(200).json({code: 200, success: true, orders})
}

module.exports = { 
    getAllOrder, 
    addOrder, 
    updateOrderByCode, 
    returnDetail, 
    payment, 
    success, 
    cancel, 
    getOrderByUserCode, 
    addOrderDetail 
};