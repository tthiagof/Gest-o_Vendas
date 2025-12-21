const express = require('express');
const router = express.Router();
const functions = require('../../repositories/crud');

router.get('/api/produtos', async (req, res) => {
  const produtos = await functions.getproducts();
  res.json(produtos);
});

router.post('/api/produtos', async (req, res) => {
  const { nome } = req.body;
  const add = await functions.addProduts(nome);

  if (add === 0) {
    return res.json({ erro: 'Erro ao criar produto' });
  }

  res.json({ mensagem: 'Produto criado' });
});

router.put('/api/produtos/:id', async (req, res) => {
  const { nome, preco, quantidade } = req.body;
  await functions.updateProduct(req.params.id, nome, preco, quantidade);
  res.json({ mensagem: 'Produto atualizado' });
});

router.delete('/api/produtos/:id', async (req, res) => {
  await functions.inactiveProduct(req.params.id);
  res.json({ mensagem: 'Produto inativado' });
});

module.exports = router;
