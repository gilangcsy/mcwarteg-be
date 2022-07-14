const db = require('../models/index');
const Transaction = db.transaction
const Op = db.Sequelize.Op;

const midtransClient = require('midtrans-client');
// Create Snap API instance
let snap = new midtransClient.Snap({
	// Set to true if you want Production Environment (accept real transaction).
	isProduction: false,
	serverKey: 'SB-Mid-server-XfJX0fTaOs_bEKleKpfreSvu'
});

module.exports = {
    async create (req, res, next) {
        const { items, total, tax, service, UserId } = req.body
        let unixTimestamps = Math.floor(Date.now() / 1000)
        const orderId = `C${UserId}-${unixTimestamps}`
        try {
            let parameter = {
                "transaction_details": {
                    "order_id": orderId,
                    "gross_amount": parseInt(total)
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "first_name": "Gilang",
                    "last_name": "Chandra Syahputra",
                    "email": "gilangchandra9@gmail.com",
                    "phone": "+628123456789",
                }
            };

            let item_details = []

            items.forEach((value) => {
                item_details.push({
                    id: value.id,
                    name: value.name,
                    price: parseInt(value.price),
                    quantity: parseInt(value.quantity)
                })
            })

            item_details.push({
                id: '-',
                name: 'Tax 10%',
                price: parseInt(tax),
                quantity: 1
            }, {
                id: '-',
                name: 'Service 3%',
                price: parseInt(service),
                quantity: 1
            })

            parameter.item_details = item_details

            const snapTransaction = await snap.createTransaction(parameter)
            
            res.send(snapTransaction)
        } catch (err) {
            next(err)
        }
    },
}