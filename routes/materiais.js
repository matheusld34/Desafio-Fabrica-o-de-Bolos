const express = require('express');
const router = express.Router();
const login = require('../middleware/login');
const MateriaisController = require('../controllers/materias-controller');


router.get('/', MateriaisController.getMateriais);
router.post('/', login.obrigatorio, MateriaisController.postMateriais);
router.get('/:id_material', MateriaisController.getUmMateriais); 
router.patch('/', MateriaisController.upDateMateriais);
router.delete('/', login.obrigatorio, MateriaisController.deleteMateriais);
    

module.exports = router;