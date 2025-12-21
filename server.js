const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(require('./routes/api/auth.api'));
app.use(require('./routes/api/clientes.api'));
app.use(require('./routes/api/produtos.api'));

app.use(require('./routes/web/auth.web'));
app.use(require('./routes/web/dashboard.web'));
app.use(require('./routes/web/clientes.web'));
app.use(require('./routes/web/produtos.web'));


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/login`);
});
