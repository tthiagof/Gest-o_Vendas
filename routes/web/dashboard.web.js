import express from 'express'
import functions from '../../middlewares/auth.middlewares.js'
const router = express.Router()

router.get('/dashboard', functions.authWeb, (req, res) => {
  res.render('dashboard', {usuario: req.session.usuarioLogado})
})

export default router