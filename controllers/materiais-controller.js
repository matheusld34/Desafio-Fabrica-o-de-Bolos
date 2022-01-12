const mysql = require('../mysql').pool;

exports.getMateriais = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM materiais',
            (error, result, field) => {
                if (error){ return res.status(500).send({ error: error})}
                const response = {
                    quantidade: result.length,
                    materiais: result.map(mat => {
                        return {
                            id_material: mat.id_material,
                            nome: mat.nome,
                            preco: mat.preco,
                            request: {
                                tipo:'GET',
                                descricao: 'Retorna os detalhes de um material especifico',
                                url: 'http://localhost:3000/materiais/' + mat.id_material
                            }

                        }
                    })
                }
                return res.status(200).send(response);
            }
         )
    });
};

exports.postMateriais = (req, res, next) => {
    console.log(req.usuario)
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({error: error})}
        conn.query(
            'INSERT INTO materiais (nome, preco) Values (?,?)',
            [req.body.nome, req.body.preco],
            (error, result, field) => {
                conn.release();
                if (error){ return res.status(500).send({ error: error})}
                const response = {
                    mensagem: 'material inserido com sucesso',
                    materialCriado: {
                        id_material: result.id_material,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        request: {
                            tipo:'GET',
                            descricao: 'Retorna todos os materiais',
                            url: 'http://localhost:3000/materiais'

                    }
                }
            }
               return res.status(201).send(response);
            }
        )
    });
};

exports.getUmMateriais = (req, res, next) => {
mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({error: error})}
    conn.query(
        'SELECT * FROM materiais WHERE id_material = ?;',
        [req.params.id_material],
        (error, result, fields) => {
            if (error){ return res.status(500).send({ error: error})}
            if (result.lenght == 0) {
                return res.status(404).send({
                    mensagem:'Não foi encontrado material com este Id'

                })
            }
            const response = {
                
                material: {
                    id_material: result[0].id_material,
                    nome: result[0].nome,
                    preco: result[0].preco,
                    request: {
                        tipo:'GET',
                        descricao: 'Retorna todos os materiais',
                        url: 'http://localhost:3000/materiais' + mat.id_material
                    }

                }
            }
           return res.status(201).send(response);
         }
      )
    });

};

exports.upDateMateriais = (req, res, next) => {
mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({error: error})}
    conn.query(
        `UPDATE materiais
            SET nome = ?,
                preco = ?
            WHERE id_material = ?`,
          
        [
         req.body.nome,
         req.body.preco, 
         req.body.id_material
        ],

        (error, result, field) => {
            conn.release();
            if (error){ return res.status(500).send({ error: error})}
            const response = {
                mensagem: 'material atualizado com sucesso',
                materialAtualizado: {
                    id_material: req.body.id_material,
                    nome: req.body.nome,
                    preco: req.body.preco,
                    request: {
                        tipo:'GET',
                        descricao: 'Retorna todos os materiais',
                        url: 'http://localhost:3000/materiais' + req.body.id_material
                    }

                }
            }
           return res.status(202).send(response);
          
            }
        )
    });
};

exports.deleteMateriais = (req, res, next) => {
mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({error: error})}
    conn.query(
        `DELETE FROM materiais WHERE id_material = ?`, [req.body.id_material],
        (error, resultado, field) => {
            conn.release();
            if (error){ return res.status(500).send({ error: error})}
            const response = {
                mensagem: 'Produto removido com sucesso',
                request: {
                    tipo: 'POST',
                    descricao: 'Insere um produto',
                    url: 'http://localhost:3000/materiais',
                    body:{
                        nome: 'String',
                        preco: 'Number'
                    }
                }
            }
            res.status(202).send({response});
            }
        )
    });
};