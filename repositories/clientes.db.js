import db from '../model/db.js'

async function addClient(nome, telefone, email, cpf) {
    try {
        const sql = 'INSERT INTO clientes (nome, numero, email, cpf) VALUES (?, ?, ?, ?)'
        const values = [nome, telefone, email, cpf]
        await db.query(sql, values)
        // console.log('Usuário adicionado com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error)
    }

}

async function inactiveCliente(id) {
    try {
        const sql = 'UPDATE clientes SET ativo = 0 WHERE id = ?'
        const values = [id]
        await db.query(sql, values)
        console.log('Usuário inativado com sucesso!')
    } catch (error) {
        console.error('Erro ao inativar usuário:', error)
    }
}

async function getUserAtive() {
    try {
        const sql = 'SELECT * FROM clientes WHERE ativo = 1'
        const [rows] = await db.query(sql)
        return rows
    } catch (error) {
        console.error('Erro ao buscar usuários ativos:', error)
        return []
    }
}

async function updateclient(id, nome, numero, email) {
  try {
    const sql = 'UPDATE clientes SET nome = ?, numero = ?, email = ? WHERE ID = ?'
    const values = [nome, numero, email, id]
    await db.query(sql, values)
    console.log(`Usuario de Id: ${id}, foi modificado com sucesso`)
    
  } catch (error) {
        console.log(`Erro ao modificar usuario: ${error}`)
    
  }  
}

const functions = {
    addClient,
    inactiveCliente,
    getUserAtive,
    updateclient
}
export default functions