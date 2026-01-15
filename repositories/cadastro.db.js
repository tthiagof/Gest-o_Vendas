import db from '../model/db.js'

async function CreateUser(nome, email, senha) {
    try {
        const sql = 'INSERT INTO usuarios (nome, email, senha) VALUE (?, ?, ?)'
        const values = [nome, email, senha]
        console.log(values)
        await db.query(sql, values)
        return 1
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error)
        return 0
    }
}

async function getUsers() {
    try {
        const sql = 'SELECT * FROM usuarios'
        const [row] = await db.query(sql)
        return row
    } catch (error) {
        console.log(error)
        return null
    }
}
const functions = {
    CreateUser,
    getUsers
}
export default functions