const ApiError = require("../error/ApiError")
const bcrypt   = require('bcrypt')
const jwt      = require('jsonwebtoken')
const User     = require('../module/module')
const Doctor   = require('../module/module')
const Patient  = require('../module/module')

const generateJwt = (id, login, role, fish) =>{
    return jwt.sign(
        {id, login, role, fish},
        process.env.SECRET_KEY,
        {expiresIn: '365d'}
    )
}

class userController{
    async registration(req,res,next){
        const {login, password} = req.body
        let role = 'User'
        if(!login || !password){
            return next(ApiError.badRequest("Login yoki Parol bo'sh"))
        }
        const condidate = await User.user.findOne({login})
        if(condidate){
            return next(ApiError.badRequest("Bu nomli foydalanuvchi bor"))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.user.create({login, password: hashPassword, role})
        const token = generateJwt(user.id, user.login, user.role)
        return res.json({token})
    }

    async login(req,res,next){
        const {login, password} = req.body
        const user = await User.user.findOne({login})
        if(!user){
            const doctor = await Doctor.doctor.findOne({login})
            if(!doctor){
                return next(ApiError.internal("Login yoki Parol noto'g'ri yozilgan"))
            }
            let comparePassword = bcrypt.compareSync(password, doctor.password)
            if(!comparePassword){
                return next(ApiError.internal("Login yoki Parol noto'g'ri yozilgan"))
            }
            const token = generateJwt(doctor.id, doctor.login, doctor.role, doctor.fish)
            return res.json({token})
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.internal("Login yoki Parol noto'g'ri yozilgan"))
        }
        const token = generateJwt(user.id, user.login, user.role, user.fish)
        return res.json({token})
    }

    async check(req,res,next){
       const token = generateJwt(req.user.id, req.user.login, req.user.role, req.user.fish)
       return res.json({token})
    }
    
    async addPatient(req,res,next){
        const {fish, sex, bloodGroup, dateOfBirth, city, address, passport, phone, NeighBorhoodId} = req.body
        const condidate = await Patient.patient.findOne({fish,dateOfBirth})
        if(condidate){
            return next(ApiError.badRequest("Bu nomli bemor bor"))
        }else if(fish === ''){
            return next(ApiError.badRequest('Ism Familiya Sharif yozilmagan'))
        }else if(phone === ''){
            return next(ApiError.badRequest('Telefon raqam yozilmagan'))
        }else if(address === ''){
            return next(ApiError.badRequest('Manzil yozilmagan'))
        }else if(sex === ''){
            return next(ApiError.badRequest('Jinsi yozilmagan'))
        }else if(bloodGroup === ''){
            return next(ApiError.badRequest('Qon gruhi tanlanmagan'))
        }else if(dateOfBirth === ''){
            return next(ApiError.badRequest('Tug`ilgan kun tanlanmagan '))
        }else{
            const patient = await Patient.patient.create({fish, sex, bloodGroup, dateOfBirth, city:'Ohangaran', address, passport, phone, status: true, NeighBorhoodId});
            return res.json(patient)
        }
    }

    async getPatient(req,res,next){
        const {id} = req.params
        const getPatient = await Patient.patient.findById(id)
        return res.json(getPatient)
    }

    async updatePatient(req,res,next){
        const {id, fish, sex, bloodGroup, dateOfBirth, address, passport, phone, NeighBorhoodId} = req.body
        const condidate = await Patient.patient.findOne({fish,dateOfBirth})
        if(condidate && id != condidate._id){
            return next(ApiError.badRequest("Bu nomli bemor bor"))
        }else if(fish === ''){
            return next(ApiError.badRequest('Ism Familiya Sharif yozilmagan'))
        }else if(phone === ''){
            return next(ApiError.badRequest('Telefon raqam yozilmagan'))
        }else if(address === ''){
            return next(ApiError.badRequest('Manzil yozilmagan'))
        }else if(sex === ''){
            return next(ApiError.badRequest('Jinsi yozilmagan'))
        }else if(bloodGroup === ''){
            return next(ApiError.badRequest('Qon gruhi tanlanmagan'))
        }else if(dateOfBirth === ''){
            return next(ApiError.badRequest('Tug`ilgan kun tanlanmagan '))
        }else{
            const patient = await Patient.patient.findByIdAndUpdate(id, {fish, sex, bloodGroup, dateOfBirth, address, passport, phone, status: true, NeighBorhoodId},{new:true});
            return res.json(patient)
        }
    }
   
    async deletePatient(req,res,next){
        const {id} = req.body
        const deletePatient = await Patient.patient.findByIdAndUpdate(id, {status: false},{new:true})
        return res.json(deletePatient)
    }
}

module.exports = new userController()