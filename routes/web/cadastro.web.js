import express from 'express'
import axios from 'axios'
const router = express.Router()

router.get('/cadastro', (req, res) => {
    res.render('cadastro', { erro: null })
})

router.post('/cadastro', async (req, res) => {
    try {
        await axios.post('http://localhost:3000/api/cadastro', req.body)
        return res.status(200).json({ message: "Cadastro feito com sucesso!" });
    } catch (erro) {
       if (erro.response && erro.response.data) {
            const mensagemDaApi = erro.response.data.message || "Erro no cadastro";
            const statusDaApi = erro.response.status || 400;
            return res.status(statusDaApi).json({ message: mensagemDaApi });
        }
        
        return res.status(500).json({ message: "Servidor de cadastro indisponível" });
    }
})

export default router