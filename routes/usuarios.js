const express = require('express');
const router = express.Router();
const UsuariosController = require('../controllers/usurios-controller');

router.post('/cadastro', UsuariosController.postCadastro);
    

router.post('/login', UsuariosController.postLogin) ;
        



module.exports = router;