import Rentalitem from '../models/rentalitem.js'

const RentalitemController = {
    async index(req, res) {
        try {
            await RentalitemController.tryIndex(req, res)
        }catch(error) {
            res.status(500)
            res.json({
                success: false,
                message: 'Error! The query is failed!'
            })
        }
    },
    async tryIndex(req, res) {
        const rentalitems = await Rentalitem.findAll()
        res.status(200)
        res.json({
            success: true,
            data: rentalitems
        })
    },
    async show(req, res) {
        try {
            await RentalitemController.tryShow(req, res)
        }catch(error) {
            res.status(500)
            res.json({
                success: false,
                message: 'Error! The query is failed!'
            })
        }
    },
    async tryShow(req, res) {
        const rentalitem = await Rentalitem.findByPk(req.params.id)
        res.status(200)
        res.json({
            success: true,
            data: rentalitem
        })
    },
    async create(req, res) {
        try {
            await RentalitemController.tryCreate(req, res)
        }catch(error) {
            res.status(500)
            res.json({
                success: false,
                message: 'Error! The query is failed!',
                error: error.message
            })
        }
    },
    async tryCreate(req, res) {
        const rentalitem = await Rentalitem.create(req.body)
        res.status(201)
        res.json({
            success: true,
            data: rentalitem
        })
    },
    async update(req, res) {
        try {
            await RentalitemController.tryUpdate(req, res)
        }catch(error) {
            let actualMessage = '';
            if(error.message == 'Fail! Record not found!') {
                actualMessage = error.message
                res.status(404)
            }else {
                res.status(500)
                actualMessage = 'Fail! The query is failed!'
            }
            
            res.json({
                success: false,
                message: actualMessage
            })
        }
    },
    async tryUpdate(req, res) {
        const recordNumber = await Rentalitem.update(req.body, {
            where: { id: req.params.id }
        })
        if(recordNumber == 0) {
            throw new Error('Fail! Record not found!')
        }
        const rentalitem = await Rentalitem.findByPk(req.params.id)
        res.status(200)
        res.json({
            success: true,
            data: rentalitem
        })
    },
    async destroy(req, res) {
        try {
            await RentalitemController.tryDestroy(req, res)
        }catch(error) {
            res.status(500)
            res.json({
                success: false,
                message: 'Error! The query is failed!'
            })
        }
    },
    async tryDestroy(req, res) {
        const rentalitem = await Rentalitem.destroy({
            where: { id: req.params.id }
        })
        res.status(200)
        res.json({
            success: true,
            data: rentalitem
        })
    }
}

export default RentalitemController