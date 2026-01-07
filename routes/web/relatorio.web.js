import express from 'express'
import axios from 'axios'

const router = express.Router()

router.get('/dashboard/relatorio' , async (req, res) => {
    res.render('relatorio')
})

export default router