import express from 'express'
import axios from 'axios'
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login', { erro: null })
})

router.post('/login', async (req, res) => {
  try {
    await axios.post('http://localhost:3000/api/login', req.body)
    res.redirect('/dashboard')
  } 
  catch (error){
    const erro = error.response.data.erro
    res.render('login', { erro })
  }
})

export default router
