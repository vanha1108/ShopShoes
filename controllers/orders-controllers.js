const HttpError = require('../error-handle/http-error');  //dùng để giải quyết error
// const models = require('../models'); //vì đang trong controllers nên phải ra ngoài thêm 1 chấm mới thấy đc models
const Category = require('../models/category');
const Brand = require('../models/brand');
const Product = require('../models/product');
const Promotion = require('../models/promotion');
const User = require('../models/user');
const Order = require('../models/order');
const OrderDetail = require('../models/orderdetail');
const ProductSize = require('../models/productsize');
const Size = require('../models/size');

const getAllOrder = async (req, res, next) => {
    let orders;
    try {
        orders = await Order.findAll(
            {
                include: [
                    {
                        model: OrderDetail,
                        include: [
                            {
                                model: ProductSize,
                                include: [
                                    {
                                        model: Product,
                                        include: [
                                            { model: Brand }
                                        ]
                                    },
                                    {
                                        model: Size
                                    }
                                ]
                            }
                        ]
                    },
                ]
            }
        );
    } catch (err) {
        const error = new HttpError(
            "System goes wrong, coud not find any Import",
            500
        );
        return next(error);
    }
    if (!orders) {
        const error = new HttpError("Could not find any Import", 204);
        return next(error);
    }
    res.status(200).json({
        success: true,
        orders
    });
}

const addOrder = async (req, res, next) => {
    let users;
    let userCurrent = req.userData.email;

    try {
        users = await User.findOne({ email: userCurrent });
    } catch (err) {
        const error = new HttpError('You are not log in. Pls login', 401);
        return next(error);
    }

    if (!users) {
        const error = new HttpError('Could not find any users', 404);
        return next(error);
    }
    const orderCreated = {
        orderCode: randomStringCodeImport(),
        address: req.body.address,
        promotionCode: req.body.promotion,
        total: req.body.total,
        status: 1,          //trạng thái 1 (Đã đặt hàng)
        userId: users.id,
        fullName: req.body.fullName,
        phone: req.body.phone,
        address: req.body.address,
        totalPrice: req.body.totalPrice,
        payment: req.body.payment
    }
    let createOrder;
    createOrder = await Order.create(orderCreated);
    res.status(200).json({ createOrder });
}
const randomStringCodeImport = () => {
    var charSet = '0123456789987654321001234567899876543210';  ///set chuỗi để có thể lấy ngẫu nhiên trong này bỏ vào kết quả
    var randomString = '';
    var len = 9;
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
}
const updateOrderById = async (req, res, next) => {
    const orderId = req.params.orderId;
    console.log(orderId)
    const orderUpdated = {
        address: req.body.address,
        status: req.body.status,
        fullName: req.body.fullName,
        phone: req.body.phone,
    }
    let updateOrder;
    updateOrder = await Order.updateOne(orderUpdated, { id: orderId });

    if (req.body.status === 4)            //1: Đã đặt, 2: Đã Duyệt, 3:Đã Thanh Toán, 4: Đã Nhận Hàng
    {
        let orderById;
        orderById = await Order.findByPk(orderId);

        let userChange;
        const userUpdated = {
            score: orderById.totalPrice
        }
        userChange = await User.updateOne(userUpdated, { id: orderById.userId });
    }
    res.status(200).json({ updateOrder })

}

const addOrderDetail = async (req, res, next) => {
    let orderItem;
    const orderDetails = {
        orderId: req.body.orderId,
        unitAmount: req.body.unitAmount,
        unitPrice: req.body.unitPrice,
        productSizeId: req.body.productSizeId
    };

    try {
        orderItem = await OrderDetail.create(orderDetails)
    } catch (err) {
        const error = new HttpError('There is system error. Pls try again', 500);
        return next(error);
    }
    let findProductSize;
    findProductSize = await ProductSize.findOne({ id: req.body.productSizeId });

    let amountProductSize;
    amountProductSize = findProductSize.productCount - req.body.unitAmount;

    let updateProductSize;
    updateProductSize = await ProductSize.updateOne({ productCount: amountProductSize }, { id: findProductSize.id });
    res.status(200).json({ orderItem });
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
    res.status(200).json({ message: "Cancel", errorCode: 1 })
}

const getOrderByUserID = async (req, res, next) => {
    let users;
    let userCurrent = req.userData.email;
    console.log(req.userData)
    console.log(userCurrent);
    try {
        users = await User.findOne({ email: userCurrent });
    } catch (err) {
        const error = new HttpError('You are not log in. Pls login', 401);
        return next(error);
    }

    if (!users) {
        const error = new HttpError('Could not find any users', 404);
        return next(error);
    }

    let orders;
    orders = await Order.findAll({
        include: [
            {
                model: OrderDetail,
                include: [
                    {
                        model: ProductSize,
                        include: [
                            {
                                model: Product,
                                include: [
                                    { model: Brand }
                                ]
                            },
                            {
                                model: Size
                            }
                        ]
                    }
                ]
            },
        ],
        where:{
            userId: users.id
        }
    });

    res.status(200).json({orders})
}

module.exports = { getAllOrder, addOrder, addOrderDetail, updateOrderById, returnDetail, payment, success, cancel, getOrderByUserID };