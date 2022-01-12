const mysql = require('../mysql').pool;

exports.getPedidos = (req, res, next) => {
    
        mysql.getConnection((error, conn) => {
            if (error) { return res.status(500).send({error: error})}
            conn.query(
                 `SELECT pedidos.id_pedido,
                         pedidos.quantidade,
                         pedidos.id_material,
                         material.nome,
                         material.preco
                    FROM pedidos
                    INER JOIN materiais
                    ON materiais.id_material = pedidos.id_material;`,
                (error, result, field) => {
                    if (error){ return res.status(500).send({ error: error})}
                    const response = {
                        pedidos: result.map(pedido => {
                            return {
                                id_pedido: pedido.id_pedido,
                                quantidade: pedido.preco,
                                material:{
                                    id_material: pedido.id_material,
                                    nome: pedido.nome,
                                    preco: pedido.preco
                                },
                                request: {
                                    tipo:'GET',
                                    descricao: 'Retorna os detalhes de um pedido especifico',
                                    url: 'http://localhost:3000/materiais/' + mat.id_pedido
                                }
    
                            }
                        })
                    }
                    return res.status(200).send(response);
                }
             )
        }); 
};

exports.getPedidos = (req, res, next) => {
    
        mysql.getConnection((error, conn) => {
            if (error) {return res.status(500).send({ error: error})}
            conn.query('SELECT * FROM materiais where id_material = ?', [req.body.id_material], (error, result, field) => {
            if (error){ return res.status(500).send({ error: error})}
            if (result.lenght == 0) {
                return res.status(404).send({
                    mensagem:'material não encontrado'
    
                })
            }
            conn.query(
                'INSERT INTO pedidos (nome, preco) Values (?,?)',
                [req.body.id_material, req.body.quantidade],
                (error, result, field) => {
                    conn.release();
                    if (error){ return res.status(500).send({ error: error})}
                    const response = {
                        mensagem: 'material inserido com sucesso',
                        pedidoCriado: {
                            id_pedido: result.id_pedido,
                            id_material: result.id_material,
                            quantidade: req.body.quantidade,
                            request: {
                                tipo:'GET',
                                descricao: 'Retorna todos os pedidos',
                                url: 'http://localhost:3000/materiais'
    
                        }
                    }
                }
                   return res.status(201).send(response);
                }
            )
        });
    })
};

exports.getUmPedidos = (req, res, next) => {

        mysql.getConnection((error, conn) => {
            if (error) { return res.status(500).send({error: error})}
            conn.query(
                'SELECT * FROM pedidos WHERE id_pedido = ?;',
                [req.params.id_pedido],
                (error, result, fields) => {
                    if (error){ return res.status(500).send({ error: error})}
                    if (result.lenght == 0) {
                        return res.status(404).send({
                            mensagem:'Não foi encontrado pedido com este Id'
    
                        })
                    }
                    const response = {
                        
                        pedido: {
                            id_pedido: result[0].id_pedido,
                            id_material: result[0].id_material,
                            quantidade: result[0].quantidade,
                            nome: result[0].nome,
                            preco: result[0].preco,
                            request: {
                                tipo:'GET',
                                descricao: 'Retorna todos os pedidos',
                                url: 'http://localhost:3000/materiais' + mat.id_material
                            }
    
                        }
                    }
                   return res.status(201).send(response);
                }
             )
        });
   
};

exports.deletePedido = (req, res, next) => {
        mysql.getConnection((error, conn) => {
            if (error) { return res.status(500).send({error: error})}
            conn.query(
                `DELETE FROM pedidos WHERE id_pedido = ?`, [req.body.id_pedido],
                (error, resultado, field) => {
                    conn.release();
                    if (error){ return res.status(500).send({ error: error})}
                    const response = {
                        mensagem: 'Pedido removido com sucesso',
                        request: {
                            tipo: 'POST',
                            descricao: 'Insere um pedido',
                            url: 'http://localhost:3000/pedidos',
                            body:{
                                id_material: 'Number',
                                quantidade: 'Number'
                            }
                        }
                    }
                    res.status(202).send({response});
                }
            )
        });
    };