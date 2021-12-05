const ApiError = require("../error/ApiError")
const Department = require('../module/module')
const History    = require('../module/module')
const Patient    = require('../module/module')
const Doctor    = require('../module/module')

class adminController{
    async fetch(req,res,next){
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
        let arrays = []
        const fetchP = await Patient.patient.countDocuments()
        const getAll = await History.history.countDocuments()
        const get    = await History.history.countDocuments({receptionDate:today})
        const getD   = await Doctor.doctor.find()
        let dotorC = []
        if(getD.length>0){
            for(let i=0; i < getD.length; i++){
                const getCD  = await History.history.countDocuments({doctorId:getD[i]._id, receptionDate:today})
                dotorC.push([getD[i].fish,getCD])
            }
        }
        arrays.push(fetchP)
        arrays.push(getAll)
        arrays.push(dotorC)
        arrays.push(get)
        return res.json(arrays)
    }
    async fetchP(req,res,next){
        const fetchP = await Patient.patient.find({receptionDate:today})
        return res.json(fetchP)
    }
}

module.exports = new adminController()