import functions from '../../middlewares/auth.middlewares.js'
import express from 'express'
import axios from 'axios'
const router = express.Router()

router.get('/dashboard/gerenclientes', functions.authWeb, async (req, res) => {
  const { data: clientes } = await axios.get('http://localhost:3000/api/clientes')

  
  res.render('gerenclientes', { clientes })
})

router.post('/dashboard/gerenclientes/add', async (req, res) => {
  try {
    await axios.post('http://localhost:3000/api/clientes', req.body)
    res.redirect('/dashboard/gerenclientes?success=1')
  } catch {
    res.redirect('/dashboard/gerenclientes?erro=1')
  }
})

router.post('/dashboard/gerenclientes/update/:id', async (req, res) => {
  await axios.put(`http://localhost:3000/api/clientes/${req.params.id}`, req.body)
  res.redirect('/dashboard/gerenclientes?success=1')
})

router.post('/dashboard/gerenclientes/delete/:id', async (req, res) => {
  await axios.delete(`http://localhost:3000/api/clientes/${req.params.id}`)
  res.redirect('/dashboard/gerenclientes?success=1')
})
 
export default router