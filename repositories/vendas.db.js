const db = require('../model/db')

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

module.exports = { 
    vendaProduct,
    getAllvendas,
    addVendas,
    getbyProduct

};

