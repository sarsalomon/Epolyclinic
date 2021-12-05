const ApiError = require("../error/ApiError")
const Neighborhood = require('../module/module')

class mfyController{
    async addMfy(req,res,next){
        const {title} = req.body
        if(!title){
            return next(ApiError.badRequest('MFY ni nomi yozing'))
        }
        const titlefind = await Neighborhood.neighborhood.findOne({title})
        if(titlefind){
            return next(ApiError.badRequest('Bunaqa nomli MFY mavjud'))
        }else{
            const addMfy = await Neighborhood.neighborhood.create({title})
            return res.json(addMfy)
        }
    }

    async fetchMfy(req,res,next){
        const fetchMfy = await Neighborhood.neighborhood.find().sort({ _id: 1 })
        return res.json(fetchMfy)
    }

    async getMfy(req,res,next){
        const {id} = req.params
        const getMfy = await Neighborhood.neighborhood.findById(id)
        return res.json(getMfy)
    }

    async updateMfy(req,res,next){
        const {id, title} = req.body
        if(!title){
            return next(ApiError.badRequest('MFY nomi yozilmagan'))
        }
        const titlefind = await Neighborhood.neighborhood.findOne({title})
        if(titlefind){
            return next(ApiError.badRequest('Bunaqa nomli MFY mavjud'))
        }else{
            const updateMfy = await Neighborhood.neighborhood.findByIdAndUpdate(id, {title},{new:true})
            return res.json(updateMfy)
        }
    }

    async deleteMfy(req,res,next){
        const {id} = req.body      
        const deleteMfy = await Neighborhood.neighborhood.findByIdAndDelete(id)
        return res.json(deleteMfy)
    }
}

module.exports = new mfyController()