import db from '../model/db.js'

async function addProduts(nome, preco, quantidade) {
    try {
        const sql = 'INSERT INTO produtos (nome, preco, quantidade) VALUES (?, ?, ?)'
        const values = [nome, preco, quantidade]
        await db.query(sql, values)
        return 1
        // console.log('Produto adicionado com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar produto:', error)
        return 0
    }
}

async function getproductsactive() {
    try {
        const sql = 'SELECT * FROM produtos WHERE ativo = 1'
        const [rows] = await db.query(sql)
        return rows
    } catch (error) {
        console.error('Erro ao buscar produtos:', error)
        return []
    }
}

async function getproducts() {
    try {
        const sql = 'SELECT * FROM produtos'
        const [rows] = await db.query(sql)
        return rows
    } catch (error) {
        console.error('Erro ao buscar produtos:', error)
        return []
    }
}
async function updateProduct(id, nome, preco, quantidade) {
    try {
        const sql = 'UPDATE produtos SET nome = ?, preco = ?, quantidade = ? WHERE id = ?'
        const values = [nome, preco, quantidade, id]
        await db.query(sql, values)
        console.log(`Produto de ID:${id}, foi modificado com sucesso!`)
        
    } catch (error) {
        console.log(`Erro ao modificar produto: ${error}`)
            
    }
}

async function inactiveProduct(id) {
    try {
        const sql = 'UPDATE produtos SET  ativo = 0 WHERE id = ?'
        const values = [id]
        await db.query(sql, values)
    } catch (error) {
        console.log(error)
    }
}

async function activeProduct(id) {
    try {
        const sql = 'UPDATE produtos SET  ativo = 1 WHERE id = ?'
        const values = [id]
        await db.query(sql, values)
    } catch (error) {
        console.log(error)
    }
}

const functions = {
    addProduts,
    getproducts,
    updateProduct,
    inactiveProduct,
    activeProduct,
    getproductsactive
}
export default functions

