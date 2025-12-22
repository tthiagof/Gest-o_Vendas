const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/dashboard/addproduts', async (req, res) => {
  const { data: produtos } = await axios.get('http://localhost:3000/api/produtos');
  // console.log(produtos);
  
  res.render('addproduts', { produtos, mensagem: null });
});

router.post('/dashboard/addproduts/add', async (req, res) => {
  try {
    await axios.post('http://localhost:3000/api/produtos', req.body);
    res.redirect('/dashboard/addproduts?success=1');
  } catch {
    res.redirect('/dashboard/addproduts?erro=1');
  }
});

router.post('/dashboard/addproduts/update/:id', async (req, res) => {
  await axios.put(`http://localhost:3000/api/produtos/${req.params.id}`, req.body);
  res.redirect('/dashboard/addproduts?success=1');
});

router.post('/dashboard/addproduts/delete/:id', async (req, res) => {
  await axios.delete(`http://localhost:3000/api/produtos/${req.params.id}`);
  res.redirect('/dashboard/addproduts?success=1');
});

module.exports = router;
