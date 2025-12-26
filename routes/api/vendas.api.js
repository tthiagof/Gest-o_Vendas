const express = require('express');
const router = express.Router();
const functions = require('../../repositories/crud');

router.get('/api/vendas', async (req, res) => {
    const vendas = await functions.getAllvendas();
    res.json(vendas);
});
router.post('/api/vendas', async (req, res) => {
    try {
        const { clienteId, produtoId, quantidade, observacoes } = req.body;

        if (!clienteId || !produtoId || !quantidade) {
            return res.status(400).json({ erro: 'Dados obrigatórios não informados' });
        }

        console.log('Dados recebidos:', req.body);
        const produto = await functions.getbyProduct(produtoId);

        let precoUnitario
        let valorTotal
        produto.forEach(item => {
            console.log(`Produto: ${item.nome}, Quantidade: ${item.quantidade}, Preço: ${item.preco}`)
            if (!item) {
                return res.status(404).json({ erro: 'Produto não encontrado' });
            }
    
            if (item.quantidade < quantidade) {
                return res.status(400).json({ erro: 'Quantidade insuficiente em estoque' });
            }
            precoUnitario = item.preco;
            valorTotal = precoUnitario * quantidade;
        })
        console.log('Valor Total:', valorTotal);
        console.log('Preço Unitário:', precoUnitario);


        const add = await functions.addVendas(
            clienteId,
            produtoId,
            quantidade,
            precoUnitario,
            observacoes, 
            valorTotal
        );

        if (!add) {
            return res.status(400).json({ erro: 'Erro ao criar venda' });
        }
        await functions.vendaProduct(produtoId, quantidade);

        res.status(201).json({ mensagem: 'Venda criada com sucesso' });

    } catch (error) {
        console.error('Erro ao criar venda:', error);
        res.status(500).json({ erro: 'Erro interno ao criar venda' });
    }
});

module.exports = router;