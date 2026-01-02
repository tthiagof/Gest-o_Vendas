import functions from '../../middlewares/auth.middlewares.js'
import express from 'express'
import axios from 'axios'
const router = express.Router()

router.get('/dashboard/vendas',functions.authWeb, async (req, res) =>{
    const {data: vendas, error} = await axios.get('http://localhost:3000/api/vendas')
    const {data: produtos} = await axios.get('http://localhost:3000/api/produtos')
    const {data: clientes} = await axios.get('http://localhost:3000/api/clientes')
    // const success = req.query.success
    // const erro = req.query.erro
    // console.log(`Vendas: ${vendas}/n Produtos: ${produtos}/n Clientes: ${clientes}`)
    res.render('vendas', {
        vendas: vendas,
        produtos: produtos,
        clientes: clientes,
        mensagem: null,
        error: error
    })
})

router.post('/dashboard/vendas/add', async (req, res) =>{
    try {
        await axios.post('http://localhost:3000/api/vendas', req.body)
        res.redirect('/dashboard/vendas?success=1')
    } catch (error) {
        console.log(`Erro ao criar venda:${error}`)
        res.redirect('/dashboard/vendas?erro=1')
    }
})

export default router