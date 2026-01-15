import express from 'express'
import bcrypt from 'bcrypt'
import functions from '../../repositories/cadastro.db.js'
const router = express.Router()

router.get('/api/cadastro', async (req, res) => {
    try {
        const users = await functions.getUsers()
        res.status(200).json(users)
        
    } catch (error) {
        res.status(500).json({message: 'erro interno'})
    }
})



router.post('/api/cadastro', async (req, res) => {
   try {
    const user = req.body 
    const [users] = await functions.getUsers()

    const nome = user.nome
    const email = user.email
    const salt = await bcrypt.genSalt(10)
    const SenhaHash = await bcrypt.hash(user.senha, salt)

    console.log(`email add: ${email}`)
    console.log(`email existente: ${users.email}`)

    if (email == users.email) {
        return res.status(400).json({message: 'Ops! Esse e-mail já possui uma conta'})
    }

    const add = await functions.CreateUser(nome, email, SenhaHash)
    if(!add) {
        return res.status(401).json({cadastro: 'Falhou'})

    }
    return res.status(200).json({cadastro: 'Ok'})

   } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Erro interno'})
   } 
})

export default router