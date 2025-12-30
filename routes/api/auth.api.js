import express from 'express'
import functions from '../../repositories/auth.db.js'
const router = express.Router()

router.post('/api/login', async (req, res) => {
  // console.log("Enttrou login");
  try {
    const { email, senha } = req.body
    const [user] = await functions.getUser(email)
    // console.log(req.body);
    // console.log(user);

    if (!user) {
      // console.log("Usuario invalido!");
      return res.status(401).json({ erro: 'Usuário inválido' })
    }

    if (senha !== user.senha) {
      // console.log("Senha invalida!");
      return res.status(401).json({ erro: 'Senha inválida' })
    }

    res.status(200).json({ mensagem: 'Login OK' })
  } catch {
    res.status(500).json({ erro: 'Erro interno' })
  }
})

export default router 