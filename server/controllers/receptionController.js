const ApiError   = require("../error/ApiError")
const History    = require('../module/module')
const Patient    = require('../module/module')
const Repection  = require('../module/module')
const Department = require('../module/module')
const Doctor     = require('../module/module')

class receptionController{
    async search(req,res,next){
        let {fish} = req.body
        let letter = fish.charAt(0);
        let patients
        let passport
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
        today = yyyy+'-'+mm+'-'+ dd;

        const getAllReceptions = await Repection.repection.find()                
        for(let i = 0; i<getAllReceptions.length; i++){
            if(getAllReceptions[i].receptionDate != today){
                const deleteoldreception = await Repection.repection.findByIdAndDelete(getAllReceptions[i]._id)
            }else{
                // console.log(getAllReceptions[i].receptionDate)
            }
        }
        if(letter === '#' && fish.length>1){
            passport = fish.substring(1);
            patients = await Patient.patient.find({passport: { $regex : '.*'+ passport + '.*' }, status: true}).sort({ _id: -1 })
        }else if(letter !== '#' && fish.length>1){     
            patients = await Patient.patient.find({fish: { $regex : '.*'+ fish + '.*' }, status: true}).sort({ _id: -1 })
        }
        return res.json(patients)
    }

    async addreception(req,res,next){
        const {patientId,departementId,doctorId,status,extreme} = req.body
        const getreception = await Repection.repection.findOne({doctorId:doctorId,patientId:patientId}).sort({ _id: -1 }) 
        if(getreception === '' || getreception === null || getreception === undefined){
            const getqueue = await Repection.repection.findOne({doctorId:doctorId}).sort({ _id: -1 })
            let queue
            if(getqueue === null ){
                queue = 1
            }else{
                queue = getqueue.queue + 1
            }
            const getname = await Patient.patient.findById(patientId)
            if(getname){
                const getdepartmentname = await Department.department.findById(departementId)
                if(getdepartmentname){
                    const getdoctorname = await Doctor.doctor.findById(doctorId)
                    if(getdoctorname){
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
                        const addreception = await Repection.repection.create({patientId:patientId,patientName: getname.fish,departementId:departementId,departementName: getdepartmentname.title,doctorId:doctorId,doctorName: getdoctorname.fish,queue:queue,status:status,doorNumber:getdoctorname.doorNumber,receptionDate:today,extreme,floorNumber:getdoctorname.floorNumber})
                        return res.json(addreception)
                    }
                }
            }
        }else{
            return res.json(getreception)
        }

    }

    async getpatient(req,res,next){
        const {id} = req.params
        const getpatient = await Patient.patient.findById(id)
        return res.json(getpatient)
    }

    async getComment(req,res,next){
        const {id} = req.params
        const getComment = await Repection.repection.findOne({patientId:id})
        return res.json(getComment)
    }

    async fetchHistories(req,res,next){
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
        const fetchHistories = await History.history.find({status:1, receptionDate:today}).sort({ _id: -1 })
        return res.json(fetchHistories)
    }
    
    async getReception(req,res,next){
        const {id} = req.body
        const getReception = await History.history.findById(id)
        if(getReception){
            const deleteRecaption = await History.history.findByIdAndUpdate(id, {status:'2'},{new:true})
        }
        return res.json(getReception)
    }
}

module.exports = new receptionController()