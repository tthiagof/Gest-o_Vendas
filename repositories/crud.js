const db = require('../model/db');

async function addClient(nome, telefone, email, cpf) {
    try {
        const sql = 'INSERT INTO clientes (nome, numero, email, cpf) VALUES (?, ?, ?, ?)';
        const values = [nome, telefone, email, cpf];
        await db.pool.query(sql, values);
        // console.log('Usuário adicionado com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
    }

}

async function inactiveCliente(id) {
    try {
        const sql = 'UPDATE clientes SET ativo = 0 WHERE id = ?';
        const values = [id];
        await db.pool.query(sql, values);
        console.log('Usuário inativado com sucesso!');
    } catch (error) {
        console.error('Erro ao inativar usuário:', error);
    }
}

async function getUserAtive() {
    try {
        const sql = 'SELECT * FROM clientes WHERE ativo = 1';
        const [rows] = await db.pool.query(sql);
        return rows;
    } catch (error) {
        console.error('Erro ao buscar usuários ativos:', error);
        return [];
    }
}

async function getUser(email) {
    try {
        const sql = 'SELECT email, senha FROM usuarios WHERE email = ?';
        const values = [email];
        const [rows] = await db.pool.query(sql, values);
        // console.log('Usuário encontrado com sucesso!');
        // console.log(rows);
        return rows;
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return null;
    }
}


async function addProduts(nome, preco, quantidade) {
    try {
        const sql = 'INSERT INTO produtos (nome, preco, quantidade) VALUES (?, ?, ?)';
        const values = [nome, preco, quantidade];
        await db.pool.query(sql, values);
        return 1;
        // console.log('Produto adicionado com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        return 0;
    }
}

async function getproducts() {
    try {
        const sql = 'SELECT * FROM produtos';
        const [rows] = await db.pool.query(sql);
        return rows;
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        return [];
    }
}
async function vendaProduct(id, quantidade) {
    try {
        const sql = 'UPDATE produtos SET quantidade = quantidade - ? WHERE id = ?';
        const values = [quantidade, id];
        await db.pool.query(sql, values);
        return 1;
    
    } catch (error) {
        console.log(error);
        return 0;
    
    }
    
}

async function getAllvendas() {
    try {
        const sql = `
            SELECT 
                v.id,
                v.data_venda,
                v.quantidade,
                v.preco_unitario,
                v.valor_total,
                v.observacoes,
                c.nome AS clienteNome,
                p.nome AS produtoNome
            FROM vendas v
            LEFT JOIN clientes c ON c.id = v.id_cliente
            LEFT JOIN produtos p ON p.id = v.id_produto
            ORDER BY v.data_venda DESC
        `;

        const [rows] = await db.pool.query(sql);
        return rows;
    } catch (error) {
        console.error('Erro ao buscar vendas:', error);
        throw error;
    }
}
async function addVendas(cliente_id, produto_id, quantidade, preco_unitario, observacoes = null, valor_total) {
    try {
        const sql = `
            INSERT INTO vendas 
            (id_cliente, id_produto, quantidade, preco_unitario, valor_total, data_venda, observacoes)
            VALUES (?, ?, ?, ?, ?, NOW(), ?)
        `;

        const values = [
            cliente_id,
            produto_id,
            quantidade,
            preco_unitario,
            valor_total,
            observacoes
        ];

        console.log(
            `Venda: cliente=${cliente_id}, produto=${produto_id}, qtd=${quantidade}, total=${valor_total}`
        );

        await db.pool.query(sql, values);
        return 1;

    } catch (error) {
        console.error('Erro ao adicionar venda:', error);
        return 0;
    }
}


async function getbyProduct(id) {
    try {
        const sql = 'SELECT * FROM produtos WHERE id = ?'
        const values = [id]
        const [rows] = await db.pool.query(sql, values)
        return rows
    } catch (error) {
        console.log(error)
    }
}

async function updateclient(id, nome, numero, email) {
  try {
    const sql = "UPDATE clientes SET nome = ?, numero = ?, email = ? WHERE ID = ?"
    const values = [nome, numero, email, id]
    await db.pool.query(sql, values)
    console.log(`Usuario de Id: ${id}, foi modificado com sucesso`);
    
  } catch (error) {
        console.log(`Erro ao modificar usuario: ${error}`);
    
  }  
}

async function updateProduct(id, nome) {
    try {
        const sql = "UPDATE produtos SET nome = ? WHERE id = ?"
        const values = [nome, id] 
        await db.pool.query(sql, values)
        console.log(`Produto de ID:${id}, foi modificado com sucesso!`);
        
    } catch (error) {
        console.log(`Erro ao modificar produto: ${error}`);
            
    }
}

async function inactiveProduct(id) {
    try {
        const sql = "UPDATTE produtos SET  ativo = 0 WHERE id = ?"
        const values = [id]
        await db.pool.query(sql, values)

    } catch (error) {
        
    }
    
}
module.exports = { 
    addClient,
    inactiveCliente,
    getUserAtive,
    getproducts,
    addProduts,
    updateclient,
    getUser,
    updateProduct,
    vendaProduct,
    inactiveProduct,
    addVendas,
    getbyProduct,
    getAllvendas

};