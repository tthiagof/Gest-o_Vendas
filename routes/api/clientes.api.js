import express from 'express'
import functions from '../../repositories/clientes.db.js'
const router = express.Router()

router.get('/api/clientes', async (req, res) => {
  const clientes = await functions.getUserAtive()
  res.json(clientes)
})

router.post('/api/clientes', async (req, res) => {
  try {
    const { nome, numero, email, cpf } = req.body
    const add = await functions.addClient(nome, numero, email, cpf)
  
    if (!add) {
      return res.json({ erro: 'Erro ao criar cliente' })
    }
    res.json({ mensagem: 'Cliente criado' })
    
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ erro: 'Erro ao criar cliente' })
    
  }
})

router.put('/api/clientes/:id', async (req, res) => {
  try {
    const { nome, numero, email } = req.body
    const id = req.params.id
    await functions.updateclient(id, nome, numero, email)
    res.status(200).json({ mensagem: 'Cliente atualizado' })

  } 
  catch (error) {
    console.log(error)
    res.status(500).json({ erro: 'Erro ao atualizar cliente' })
  }
})

router.delete('/api/clientes/:id', async (req, res) => {
  try {
    await functions.inactiveCliente(req.params.id)
    res.status(200).json({ mensagem: 'Cliente inativado' })
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ erro: 'Erro ao inativar cliente' })
  }
})

export default router