const express = require('express') 
const {createMenuAndSubMenu1,getAllMenu1,getMenuById1,updateMenu1,deleteMenu1} = require('../controller/submenu')
// const { getAllSubMenuByStudent,getSubMenuByIdByStudent} = require('../controllers/student/submenu')
// const { getAllSubMenuByTeacher,getSubMenuByIdByTeacher} = require('../controllers/teacher/submenu')
const submenu = express.Router()


//ADMIN
submenu.post('/createMenuAndSubMenu1',createMenuAndSubMenu1)
submenu.get('/getAllMenu1',getAllMenu1)
submenu.get('/getMenuById1/:id',getMenuById1)
submenu.put('/updateMenu1/:id',updateMenu1)
submenu.delete('/deleteMenu1/:id',deleteMenu1)

//STUDENT
// menu.get('/getAllSubMenuByStudent',getAllSubMenuByStudent)
// menu.get('/getSubMenuByIdByStudent/:id',getSubMenuByIdByStudent)

//TEACHER
// menu.get('/getAllSubMenuByTeacher',getAllSubMenuByTeacher)
// menu.get('/getSubMenuByIdByTeacher/:id',getSubMenuByIdByTeacher)

module.exports =submenu