const paypal = require('paypal-rest-sdk');
const {PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PORT} = require('../config')

paypal.configure({
    mode: 'sandbox', 
    client_id: PAYPAL_CLIENT_ID,
    client_secret: PAYPAL_CLIENT_SECRET
});

const create_payment = (items, total) => {
    return create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": `${PORT}/api/order/paypal/success`,
            "cancel_url": `${PORT}/api/order/paypal/cancel`
        },
        "transactions": [{
            "item_list": {
                "items": items
            },
            "amount": {
                "currency": "USD",
                "total": total.toString()
            },
            "description": "Thanks for your shopping"
        }]
    
    }
};

const execute_payment = (payerId) => {
    return  execute_payment_json = {
        "payer_id": payerId
        };
}

module.exports = {create_payment, execute_payment};