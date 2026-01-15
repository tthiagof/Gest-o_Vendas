import express from 'express'
import axios from 'axios'
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login', { erro: null })
})

router.post('/login', async (req, res) => {
  try {

    const response = await axios.post('http://localhost:3000/api/login', req.body)
    const dados = response.data
    req.session.usuarioLogado = {id: dados.id, email: dados.email, token: dados.token}
    res.redirect('/dashboard')
  } 
  catch (error){
    const erro = error.response.data.erro
    res.render('login', { erro })
  }
})

export default router
