const db = require('../models/index');
const Menu = db.menu
const Category = db.category
const Op = db.Sequelize.Op;

module.exports = {
    async read(req, res, next) {
        try {
            const { category, name } = req.query
            const pageAsNumber = Number.parseInt(req.query.page)
            const sizeAsNumber = Number.parseInt(req.query.size)

            let page = 0
            if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
                page = pageAsNumber
            }
            
            let size = 4
            if(!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 4) {
                size = sizeAsNumber
            }
            const conditionMenu = {
                deletedAt: null,
                name: {
                    [Op.iLike]: name ? `%${name}` : `%%`
                }
            }
            const condition = {name: { [Op.iLike]: category ? `%${category}` : `%%` } };
            const allMenu = await Menu.findAndCountAll({
                where: conditionMenu,
                attributes: ['id', 'name', 'description', 'price', 'status', 'discount', 'urlPhoto'],
                include: [
                    {
                        model: Category,
                        attributes: ['id', 'name'],
                        where: condition,
                    },
                ],
                order: [
                    ['createdAt', 'ASC']
                ],
                limit: size,
                offset: page * size
            })

            res.status(200).send({
                success: true,
                message: "Get all menu has been successfully.",
                totalPages: Math.ceil(allMenu.count / size),
                data: allMenu.rows
            })
        }
        catch (err) {
            next(err)
        }
    },

    // async readById(req, res, next) {
    //     try {
    //         const { id } = req.params

    //         const data = await ClaimType.findOne({
    //             where: {
    //                 id: id
    //             },
    //             attributes: ['id', 'name']
    //         })

    //         if (data) {
    //             res.status(200).send({
    //                 success: true,
    //                 message: "Get Claim Type by Id Has Been Successfully.",
    //                 data: data
    //             })
    //         } else {
    //             res.status(400).json({
    //                 success: false,
    //                 message: 'Claim type not found.'
    //             })
    //         }

    //     }
    //     catch (err) {
    //         next(err)
    //     }
    // },

    async create(req, res, next) {
        try {
            const {
                name,
                description,
                price,
                discount,
                discountDescription,
                status,
                urlPhoto,
                createdBy,
                CategoryId
            } = req.body

            let data = {
                name: name,
                description: description,
                price: price,
                discount: discount,
                discountDescription: discountDescription,
                status: status,
                urlPhoto: urlPhoto,
                createdBy: createdBy,
                CategoryId: CategoryId
            }

            const createMenu = await Menu.create(data)

            res.status(201).json({
                success: true,
                message: 'Succesfully creating Menu.',
                data: createMenu
            })
        }
        catch (err) {
            next(err)
        }
    },

    // async delete(req, res, next) {
    //     try {
    //         const { id } = req.params
    //         const { deletedBy } = req.body

    //         const data = await ClaimType.findOne({
    //             where: {
    //                 id: id
    //             },
    //             attributes: ['name']
    //         })

    //         if (data) {
    //             const deleteData = await ClaimType.update({
    //                 deletedAt: new Date(),
    //                 deletedBy: deletedBy
    //             }, {
    //                 where: {
    //                     id: id
    //                 }
    //             })
    //             res.status(200).json({
    //                 success: true,
    //                 message: 'Delete Claim type has been successfully.'
    //             })
    //         } else {
    //             res.status(400).json({
    //                 success: false,
    //                 message: 'Claim type not found.'
    //             })
    //         }

    //     }
    //     catch (err) {
    //         next(err)
    //     }
    // },

    // async update(req, res, next) {
    //     try {
    //         const { name, updatedBy } = req.body
    //         const { id } = req.params

    //         const data = await ClaimType.findOne({
    //             where: {
    //                 id: id
    //             },
    //             attributes: ['id', 'name']
    //         })

    //         if(data) {
    //             let updatingData = {
    //                 name: name,
    //                 updatedBy: updatedBy,
    //                 updatedAt: new Date()
    //             }
    //             const update = await ClaimType.update(updatingData, {
    //                 where: {
    //                     id: id
    //                 }
    //             })

    //             res.status(200).json({
    //                 success: true,
    //                 message: 'Claim type has been updated.'
    //             })
    //         } else {
    //             res.status(404).json({
    //                 success: false,
    //                 message: 'Claim type not found.'
    //             })
    //         }

    //     }
    //     catch (err) {
    //         next(err)
    //     }
    // },
}