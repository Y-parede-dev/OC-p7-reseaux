const express = require('express');
const router = express.Router();
const user_ctrl = require('../controleurs/user');

router.post('/signup', user_ctrl.signup); // Inscription

router.get('/account', user_ctrl.getAllAccount); //get tous les comptes

router.get('/account:id', user_ctrl.getOneAccount); //get tous les comptes

router.delete('/account:id',user_ctrl.deleteAccount); // delete 1 compte

router.put('/account:id',user_ctrl.modifyAccount); //modifier 1 compt

router.post('/login',user_ctrl.login); // connection

module.exports = router;