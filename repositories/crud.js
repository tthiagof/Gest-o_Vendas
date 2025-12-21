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


async function addProduts(nome) {
    try {
        const sql = 'INSERT INTO produtos (nome) VALUES (?)';
        const values = [nome];
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
    updateProduct
};