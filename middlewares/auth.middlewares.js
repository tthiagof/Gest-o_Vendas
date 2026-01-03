function authWeb(req, res, next) {
  console.log(req.session)
    if (req.session && req.session.usuarioLogado) {
    // console.log(`Autorizado: ${req.session.usuarioLogado.email}`)
    return next()
  }

  console.log('Acesso negado: redirecionando para login')
  res.redirect('/login')
}

const functions = {
  authWeb
}
export default functions