const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

router.get('/dashboard/vendas', (req, res) => {
  res.render('vendas');
});

module.exports = router;
