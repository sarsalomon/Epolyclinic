const ApiError = require("../error/ApiError")
const Department   = require('../module/module')

class departmentController{
    async addDepartment(req,res,next){
        const {title} = req.body
        if(!title){
            return next(ApiError.badRequest('Empty uz or ru'))
        }
        const titlefind = await Department.department.findOne({title})
        if(titlefind){
            return next(ApiError.badRequest('Exits uz title'))
        }else{
            const departmentadd = await Department.department.create({title})
            return res.json(departmentadd)
        }
    }

    async fetchDepartment(req,res,next){
        const fetchDepartment = await Department.department.find().sort({ _id: -1 })
        return res.json(fetchDepartment)
    }

    async getDepartment(req,res,next){
        const {id} = req.params
        const getDepartment = await Department.department.findById(id)
        return res.json(getDepartment)
    }

    async updateDepartment(req,res,next){
        const {id, title} = req.body
        if(!title){
            return next(ApiError.badRequest('Empty uz or ru'))
        }
        const titlefind = await Department.department.findOne({title})
        if(titlefind){
            return next(ApiError.badRequest('Exits uz title'))
        }else{
            const updateDepartment = await Department.department.findByIdAndUpdate(id, {title},{new:true})
            return res.json(updateDepartment)
        }
    }

    async deleteDepartment(req,res,next){
        const {id} = req.body      
        const deleteDepartment = await Department.department.findByIdAndDelete(id)
        return res.json(deleteDepartment)
    }
}

module.exports = new departmentController()