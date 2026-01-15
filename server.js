import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import cors from 'cors'

import authApi from './routes/api/auth.api.js'
import cadastroAPI from './routes/api/cadastro.api.js'
import clientesApi from './routes/api/clientes.api.js'
import produtosApi from './routes/api/produtos.api.js'
import vendasApi from './routes/api/vendas.api.js'
import relatorioApi from './routes/api/relatorio.api.js'

import authWeb from './routes/web/auth.web.js'
import cadastroWeb from './routes/web/cadastro.web.js'
import dashboardWeb from './routes/web/dashboard.web.js'
import clientesWeb from './routes/web/clientes.web.js'
import produtosWeb from './routes/web/produtos.web.js'
import vendasWeb from './routes/web/vendas.web.js'
import relatorioWeb from './routes/web/relatorio.web.js'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cors())
app.set('view engine', 'ejs')

app.use(session({
  secret: process.env.JWT_SECRET || 'g7h2i2ilH0NUxtDpVFANiW', 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(authApi)
app.use(cadastroAPI)
app.use(clientesApi)
app.use(produtosApi)
app.use(vendasApi)
app.use(relatorioApi)

app.use(authWeb)
app.use(cadastroWeb)
app.use(dashboardWeb)
app.use(clientesWeb)
app.use(produtosWeb)
app.use(vendasWeb)
app.use(relatorioWeb)

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/cadastro`)
})