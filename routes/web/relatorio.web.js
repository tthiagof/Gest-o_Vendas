import express from 'express'
const router = express.Router()

router.get('/dashboard/relatorio' , async (req, res) => {
    res.render('relatorio')
})

export default router