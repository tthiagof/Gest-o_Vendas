import db from '../model/db.js'

async function getUser(email) {
    try {
        const sql = 'SELECT id, email, senha FROM usuarios WHERE email = ?'
        const values = [email]
        const [rows] = await db.query(sql, values)
        // console.log('Usuário encontrado com sucesso!');
        // console.log(rows);
        return rows
    } catch (error) {
        console.error('Erro ao buscar usuário:', error)
        return null
    }
}
const functions = {
    getUser
}
export default functions