const express = require('express');
const router = express.Router();
const functions = require('../../repositories/crud');

router.post('/api/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const [user] = await functions.getUser(email);

    if (!user) {
      return res.json({ erro: 'Usuário inválido' });
    }

    if (senha !== user.senha) {
      return res.json({ erro: 'Senha inválida' });
    }

    res.json({ mensagem: 'Login OK' });
  } catch {
    res.json({ erro: 'Erro interno' });
  }
});

module.exports = router;
