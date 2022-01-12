const express = require('express');
const router = express.Router();
const PedidosController = require('../controllers/pedidos-controller');

router.get('/', PedidosController.getPedidos);
router.post('/', PedidosController.getPedidos);
router.get('/:id_pedido', PedidosController.getUmPedidos);
router.get('/', PedidosController.deletePedidos);

module.exports = router;