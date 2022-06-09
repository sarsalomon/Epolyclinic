const ApiError    = require("../error/ApiError")
const Doctor      = require('../module/module')
const Department  = require('../module/module')
const Repection   = require('../module/module')
const History     = require('../module/module')
const Patient     = require('../module/module')
const bcrypt      = require('bcrypt')
const uuid        = require('uuid')
const path        = require('path');

class doctorController{
    async addDoctor(req,res,next){
        const {fish, phone, workingSince, login, password, departmentId, dateOfBirth, mfy, floor, door} = req.body
        if(!req.files){
            return next(ApiError.badRequest('Rasm tanlanmadi'))
        }else if(fish === ''){
            return next(ApiError.badRequest('FISH yozilmagan'))
        }else if(phone === ''){
            return next(ApiError.badRequest('Telefon raqam yozilmagan'))
        }else if(workingSince === ''){
            return next(ApiError.badRequest('Qachon beri ishlash sanasi tanlanmagan'))
        }else if(login === ''){
            return next(ApiError.badRequest('Login yozilmagan'))
        }else if(password === ''){
            return next(ApiError.badRequest('Parol yozilmagan'))
        }else if(departmentId === ''){
            return next(ApiError.badRequest('Toifa tanalanmagan'))
        }else if(dateOfBirth === ''){
            return next(ApiError.badRequest(`Tug'ilgan sana tanlanmagan`))
        }else{
            const condidate = await Doctor.doctor.findOne({fish:fish})
            if(condidate){
                return next(ApiError.badRequest('Shifakor tizim bor'))
            }
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const getDepartment = await Department.department.findById(departmentId)
            if(getDepartment){
                const hashPassword = await bcrypt.hash(password,5)
                const doctor = await Doctor.doctor.create({fish, phone, workingSince, login, password:hashPassword, departmentId, departmentName:getDepartment.title, dateOfBirth, role:'Doctor', NeighBorhoodId:mfy,doorNumber:door, floorNumber:floor})
                return res.json(doctor)
            }else{

            }

        }
    }

    async fetchDoctor(req,res,next){
        const fetchDoctor = await Doctor.doctor.find().sort({ _id: -1 })
        return res.json(fetchDoctor)
    }

    async fetchPatients(req,res,next){
        const {id} = req.body
        if(id !== undefined && id !== ''){
            const fetchPatients = await Repection.repection.find({doctorId:id})
            return res.json(fetchPatients)
        }
    }

    async RedirectAthor(req,res,next){
        const {id, departementId, departementName, doctorId, doctorName, comment, queue, olddoctor} = req.body
        console.log(req.body)
        if(comment === 'undefined'){
            return next(ApiError.badRequest('Izohni yozing'))
        }else if(departementId === ''){
            return next(ApiError.badRequest('Yo`nalish tanlanmadi'))
        }else if(doctorId === ''){
            return next(ApiError.badRequest('Shifakor tanlanmadi'))
        }
        const getqueue = await Repection.repection.findOne({doctorId:doctorId}).sort({ _id: -1 })
        let queues
        if(getqueue === null ){
            queues = 1
        }else{
            queues = getqueue.queue + 1
        }
        const getname = await Patient.patient.findById(id)

        if(getname){
            const getdepartmentname = await Department.department.findById(departementId)

            if(getdepartmentname){
                const getdoctorname = await Doctor.doctor.findById(doctorId)
 
                if(getdoctorname){
                    const getreceptionid = await Repection.repection.findOne({patientId:id,departementId:departementId,doctorId:olddoctor})
                    if(getreceptionid){
                        let newcomment
                        newcomment = comment + '\n' + getdoctorname.fish
                        const Redirect = await Repection.repection.findByIdAndUpdate(getreceptionid._id, {departementId:departementId,departementName:getdepartmentname.title,doctorId:doctorId,doctorName:getdoctorname.fish,comment:newcomment,queue:queues},{new:true})
                        return res.json(Redirect)
                    }
                }
            }
        }
    }

    async fetchHistories(req,res,next){
        const {id} = req.body
        if(id !== undefined && id !== ''){
            const fetchHistories = await History.history.find({patientId:id}).sort({ _id: -1 })
            return res.json(fetchHistories)
        }
    }

    async getPatient(req,res,next){
        const {id} = req.body
        if(id !== undefined && id !== ''){
            const getPatiente = await Repection.repection.findOne({doctorId:id,extreme:1}).sort({ _id: 1 })
            if(getPatiente == null || getPatiente == ''){
                const getPatient = await Repection.repection.findOne({doctorId:id,extreme:0}).sort({ _id: 1 })
                return res.json(getPatient)
            }
            return res.json(getPatiente)
        }
    }

    async getDoctor(req,res,next){
        const {id} = req.params
        const getDoctor = await Doctor.doctor.find({departmentId:id})
        return res.json(getDoctor)
    }

    async updateDoctor(req,res,next){
        const {id, title} = req.body
        if(!title){
            return next(ApiError.badRequest('Empty uz or ru'))
        }
        const titlefind = await Doctor.doctor.findOne({title})
        if(titlefind){
            return next(ApiError.badRequest('Exits uz title'))
        }else{
            const updateDoctor = await Doctor.doctor.findByIdAndUpdate(id, {title},{new:true})
            return res.json(updateDoctor)
        }
    }

    async deleteDoctor(req,res,next){
        const {id} = req.body      
        const deleteDoctor = await Doctor.doctor.findByIdAndDelete(id)
        return res.json(deleteDoctor)
    }
        
    async deleteDoctor(req,res,next){
        const {id} = req.body      
        const deleteDoctor = await Doctor.doctor.findByIdAndDelete(id)
        return res.json(deleteDoctor)
    }

    async getCountPatient(req,res,next){
        const {id} = req.body
        const getCountPatient = await Repection.repection.countDocuments({doctorId: id})
        return res.json(getCountPatient)
    }

    async addHistory(req,res,next){
        const {id, patientId, patientName, departementId, departementName, doctorId, doctorName, status, comment, medications, queue, doorNumber} = req.body
        if(comment === ''){
            return next(ApiError.badRequest('Iltimos tashhis yozib bering'))
        }else if(medications === ''){
            return next(ApiError.badRequest('Iltimos dori yozib bering'))
        }
        var today = new Date();
        var dd = today.getDate();
        
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        if(dd<10) 
        {
            dd='0'+dd;
        } 
        
        if(mm<10) 
        {
            mm='0'+mm;
        } 
        today = yyyy+'-'+mm+'-'+dd;
        let fileName 
        if(!req.files){
            fileName = ''
        }else if(req.files){
            const {img} = req.files
            fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'upload/diagnosis', fileName))
        }
        const addHistory = await History.history.create({patientId,patientName,departementId,departementName,doctorId,doctorName,status:'1',comment,medications,queue,doorNumber,receptionDate:today,img: fileName})
        if(addHistory){
            const receptiondelete = await Repection.repection.findByIdAndDelete(id)
        }
        return res.json(addHistory)
    }

    async addHistoryCancel(req,res,next){
        const {id,patientId,patientName,departementId,departementName,doctorId,doctorName,status,comment,medications,queue,doorNumber} = req.body
        var today = new Date();
        var dd = today.getDate();
        
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        if(dd<10) 
        {
            dd='0'+dd;
        } 
        
        if(mm<10) 
        {
            mm='0'+mm;
        } 
        today = yyyy+'-'+mm+'-'+dd;
        const addHistory = await History.history.create({patientId,patientName,departementId,departementName,doctorId,doctorName,status:'1',comment,medications,queue,doorNumber,receptionDate:today})
        if(addHistory){
            const receptiondelete = await Repection.repection.findByIdAndDelete(id)
        }
        return res.json(addHistory)
    }

    async getHistoryView(req,res,next){
        const {id} = req.body
        const viewHistory = await History.history.findById(id)
        return res.json(viewHistory)
    } 

}

module.exports = new doctorController()