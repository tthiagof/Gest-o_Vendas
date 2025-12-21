const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/dashboard/gerenclientes', async (req, res) => {
  const { data: clientes } = await axios.get('http://localhost:3000/api/clientes');

  let mensagem = null;
  if (req.query.success) mensagem = 'Cliente adicionado com sucesso!';
  if (req.query.erro) mensagem = 'Erro ao adicionar cliente!';

  res.render('gerenclientes', { clientes, mensagem });
});

router.post('/dashboard/gerenclientes/add', async (req, res) => {
  try {
    await axios.post('http://localhost:3000/api/clientes', req.body);
    res.redirect('/dashboard/gerenclientes?success=1');
  } catch {
    res.redirect('/dashboard/gerenclientes?erro=1');
  }
});

router.post('/dashboard/gerenclientes/update/:id', async (req, res) => {
  await axios.put(`http://localhost:3000/api/clientes/${req.params.id}`, req.body);
  res.redirect('/dashboard/gerenclientes?success=1');
});

router.post('/dashboard/gerenclientes/delete/:id', async (req, res) => {
  await axios.delete(`http://localhost:3000/api/clientes/${req.params.id}`);
  res.redirect('/dashboard/gerenclientes?success=1');
});

module.exports = router;
