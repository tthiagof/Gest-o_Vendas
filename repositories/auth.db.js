const db = require('../model/db')

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

module.exports = {
    getUser
}