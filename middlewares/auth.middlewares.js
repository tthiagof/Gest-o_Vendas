import jwt from 'jsonwebtoken';

function authWeb(req, res, next) {
  const usuario = req.session.usuarioLogado;
  console.log(usuario);

  if (!usuario || !usuario.token) {
    console.log('Sem sessão ativa. Redirecionando...');
    return res.redirect('/login');
  }

  try {
    const verificado = jwt.verify(usuario.token, process.env.JWT_SECRET);
    req.user = verificado;
    next();
  } catch (error) {
    console.log('Token inválido ou expirado.');
    res.redirect('/login');
  }
}

const functions = {
  authWeb
}
export default functions