const express = require('express') 
const {createSubServices,getAllSubServices,getSubServicesById,updateSubServices,deleteSubMenu} = require('../controller/subservices')
// const { getAllSubMenuByStudent,getSubMenuByIdByStudent} = require('../controllers/student/submenu')
// const { getAllSubMenuByTeacher,getSubMenuByIdByTeacher} = require('../controllers/teacher/submenu')
const submenu = express.Router()


//ADMIN
submenu.post('/createSubServices',createSubServices)
submenu.get('/getAllSubServices',getAllSubServices)
submenu.get('/getSubServicesById/:id',getSubServicesById)
submenu.put('/updateSubServices/:id',updateSubServices)
submenu.delete('/deleteSubMenu/:id',deleteSubMenu)

module.exports =submenu