const express = require('express');
const router = express.Router();
const functions = require('../../repositories/crud');

router.get('/api/clientes', async (req, res) => {
  const clientes = await functions.getUserAtive();
  res.json(clientes);
});

router.post('/api/clientes', async (req, res) => {
  const { nome, numero, email, cpf } = req.body;
  const add = await functions.addClient(nome, numero, email, cpf);

  if (add === 0) {
    return res.json({ erro: 'Erro ao criar cliente' });
  }

  res.json({ mensagem: 'Cliente criado' });
});

router.put('/api/clientes/:id', async (req, res) => {
  const { nome, numero, email } = req.body;
  await functions.updateclient(req.params.id, nome, numero, email);
  res.json({ mensagem: 'Cliente atualizado' });
});

router.delete('/api/clientes/:id', async (req, res) => {
  await functions.inactiveCliente(req.params.id);
  res.json({ mensagem: 'Cliente inativado' });
});

module.exports = router;
