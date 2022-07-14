const { Pagination } = require('../../helpers/pagination');
const db = require('../models/index');
const Menu = db.menu
const Category = db.category
const Cart = db.cart
const Op = db.Sequelize.Op;

module.exports = {
    async readCartByUserId (req, res, next) {
        try {
            const { id } = req.params
            const { page, size } = req.query
            const pagination = Pagination(page, size, 10)
            
            const cartByUser = await Cart.findAndCountAll({
                where: {
                    UserId: id
                },
                attributes: ['id', 'quantity'],
                include: [
                    {
                        model: Menu,
                        attributes: ['id', 'name', 'description', 'urlPhoto', 'price'],
                        include: [
                            {
                                model: Category,
                                attributes: ['id', 'name'],
                                
                            },
                        ],
                    },
                ],
                order: [
                    ['createdAt', 'ASC']
                ],
                limit: pagination.size,
                offset: pagination.page * pagination.size
            })

            res.status(200).json({
                success: true,
                message: 'Get cart by user id has been successfully.',
                totalPages: Math.ceil(cartByUser.count / pagination.size),
                data: cartByUser.rows
            })
        } catch (err) {
            next(err)
        }
    },

    async addToCart(req, res, next) {
        try {
            const { MenuId, UserId } = req.body
            const findExistCart = await Cart.findOne({
                where: {
                    MenuId: MenuId,
                    UserId: UserId
                },
                attributes: ['id', 'quantity'],
            })

            let data = {
                MenuId: MenuId,
                UserId: UserId
            }

            if(findExistCart) {
                const updateCart = await Cart.update({
                    quantity: findExistCart.quantity + 1,
                }, {
                    where: {
                        id: findExistCart.id
                    }
                })
                
                res.status(200).json({
                    success: true,
                    message: 'Update quantity menu has been successfully.'
                })
            } else {
                data.quantity = 1
                const createCart = await Cart.create(data)

                res.status(200).json({
                    success: true,
                    message: 'Add menu to cart has been successfully.',
                    data: createCart
                })
            }
        }
        catch (err) {
            next(err)
        }
    },

    async updateQuantity(req, res, next) {
        try {
            const { quantity } = req.body
            const { id } = req.params

            const findCart = await Cart.findByPk(id)

            if(findCart) {
                const updateCart = await Cart.update({
                    quantity: quantity,
                },{
                    where: {
                        id: id
                    }
                })

                res.status(200).json({
                    success: true,
                    message: 'Update quantity cart has been successfully.'
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Id not found.'
                })
            }

        } catch (err) {
            next(err)
        }
    },

    async delete(req, res, next) {
        try {
            const { id } = req.params

            const findCart = await Cart.findByPk(id)

            if(findCart) {
                const deleteCart = await Cart.destroy({
                    where: {
                        id: id
                    }
                })
                
                res.status(200).json({
                    success: true,
                    message: 'Delete cart has been successfully.'
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Id not found.'
                })
            }
        } catch (err) {
            next(err)
        }
    },
}