const { Schema, model }  = require('mongoose')

const UserSchema = new Schema({
    login: {type:String},
    password: {type:String},
    fish: {type:String},
    phone: {type:String},
    role:{type:String}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} })

const DoctorSchema = new Schema({
    login: {type:String},
    password: {type:String},
    fish: {type:String},
    phone: {type:String},
    img: {type:String},
    dateOfBirth: {type:String},
    workingSince: {type:String},
    departmentId: {type:String},
    departmentName: {type:String},
    doorNumber: {type:String},
    floorNumber: {type:String},
    NeighBorhoodId: {type:String},
    role:{type:String}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} })

const NurseSchema = new Schema({
    fish: {type:String},
    phone: {type:String},
    dateOfBirth: {type:String},
    workingSince: {type:String},
    departmentId: {type:String},
    departmentName: {type:String},
    doctorId: {type:String},
    doctorName: {type:String}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} })

const AttendanceSchema = new Schema({

}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} })

const DepartmentSchema = new Schema({
    title: {type:String}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} })

const PatientSchema = new Schema({
    fish: {type:String},
    sex: {type:String},
    bloodGroup: {type:String},
    dateOfBirth: {type:String},
    city: {type:String},
    address: {type:String},
    passport: {type:String},
    phone: {type:String},
    status: {type:Boolean},
    NeighBorhoodId: {type:String}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} })

const RepectionSchema = new Schema({
    patientId: {type:String},
    patientName: {type:String},
    departementId: {type:String},
    departementName: {type:String},
    doctorId: {type:String},
    doctorName: {type:String},
    userFrom: {type:String},
    status: {type:String},
    comment: {type:String},
    medications: {type:String},
    queue: {type:Number},
    floorNumber: {type:String},
    doorNumber: {type:String},
    extreme: {type:String},
    img: {type:String},
    receptionDate: {type:String}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} })

const HistorySchema = new Schema({
    patientId: {type:String},
    patientName: {type:String},
    departementId: {type:String},
    departementName: {type:String},
    doctorId: {type:String},
    doctorName: {type:String},
    userFrom: {type:String},
    status: {type:String},
    comment: {type:String},
    medications: {type:String},
    queue: {type:Number},
    floorNumber: {type:String},
    doorNumber: {type:String},
    extreme: {type:String},
    img: {type:String},
    receptionDate: {type:String}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} })

const NeighBorhoodSchema = new Schema({
    title: {type:String}
}, { timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'} })

module.exports.user         = model('User', UserSchema)
module.exports.doctor       = model('Doctor', DoctorSchema)
module.exports.nurse        = model('Nurse', NurseSchema)
module.exports.attendance   = model('Attendance', AttendanceSchema)
module.exports.department   = model('Department', DepartmentSchema)
module.exports.patient      = model('Patient', PatientSchema)
module.exports.repection    = model('Repection', RepectionSchema)
module.exports.history      = model('History', HistorySchema)
module.exports.neighborhood = model('NeighBorhood', NeighBorhoodSchema)