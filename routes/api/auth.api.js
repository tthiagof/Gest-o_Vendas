import 'dotenv/config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import express from 'express'
import functions from '../../repositories/auth.db.js'

const router = express.Router()
const secret = process.env.JWT_SECRET
// console.log(secret)

router.post('/api/login', async (req, res) => {
  try {
    const { email, senha } = req.body

    const [user] = await functions.getUser(email)

    if (!user) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos' })
    }

    const senhaValida = await bcrypt.compare(senha, user.senha)

    if (!senhaValida) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos' })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      secret,
      { expiresIn: '4h' }
    )
    // console.log('Antes de add', user.id, user.email)

    req.session.usuarioLogado = {
      id: user.id,
      email: user.email,
      token: token
    }
    // console.log('Depois de add',req.session.usuarioLogado)
    
    res.status(200).json({message: 'Login ok!',id: user.id, email: user.email, token: token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ erro: 'Erro interno no servidor' })
  }
})

export default router