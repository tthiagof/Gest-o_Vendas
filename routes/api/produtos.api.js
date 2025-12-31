import express from 'express'
import functions from '../../repositories/produtos.db.js'
const router = express.Router()

router.get('/api/produtos', async (req, res) => {
  const produtos = await functions.getproducts()
  // console.log(produtos)
  res.json(produtos)
})

router.post('/api/produtos', async (req, res) => {
  const { nome, preco, quantidade } = req.body
  const add = await functions.addProduts(nome, preco, quantidade)

  if (add === 0) {
    return res.json({ erro: 'Erro ao criar produto' })
  }

  res.json({ mensagem: 'Produto criado' })
})

router.put('/api/produtos/:id', async (req, res) => {
  const { nome, preco, quantidade } = req.body
  await functions.updateProduct(req.params.id, nome, preco, quantidade)
  res.json({ mensagem: 'Produto atualizado' })
})

router.delete('/api/produtos/:id', async (req, res) => {
  await functions.inactiveProduct(req.params.id)
  res.json({ mensagem: 'Produto inativado' })
})

router.put('/api/produtos/active/:id', async (req, res) => {
  await functions.activeProduct(req.params.id)
  res.json({ mensagem: 'Produto inativado' })
})

export default router
