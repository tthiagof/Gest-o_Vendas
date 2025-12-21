const express = require('express');
const bcrypt = require('bcrypt');
const functions = require('./repositories/crud');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.set('view engine', 'ejs');

app.get('/login', (req, res) => {
    res.render('login' , { erro: null });
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
})
app.get('/dashboard/addproduts', async (req, res) => {
    const produtos = await functions.getproducts();
    // console.log(produtos);
    
    res.render('addproduts', { produtos, mensagem: null });
})

app.get('/dashboard/gerenclientes', async(req, res) => {
      const clientes = await functions.getUserAtive();

    let mensagem = null;

    if (req.query.success) {
        mensagem = 'Cliente adicionado com sucesso!';
    }

    if (req.query.erro) {
        mensagem = 'Erro ao adicionar cliente!';
    }

    res.render('gerenclientes', { clientes, mensagem });
})

app.get('/dashboard/vendas', async (req, res) => {
    res.render('vendas')
})


app.post('/login', async (req, res) => { 
    try {
        const body = req.body;
        // console.log(body);

        const [user] = await functions.getUser(body.email);

        if (!user) {
            return res.render('login', {
                erro: 'Usuário não encontrado!'
            });
        }

        // USAR SENHA CRIPTGRAFADA AQUI 
        const match = body.senha === user.senha;

        if (match) {
            // console.log('Senha correta!');
            return res.redirect('/dashboard');

        } else {
            // console.log('Senha incorreta!');

            return res.render('login', {
                erro: 'Senha incorreta!'
            });
        }

    } catch (err) {
        console.error(err);
        return res.render('login', {
            erro: 'Erro interno no servidor'
        });
    }

})
app.post('/dashboard/gerenclientes/add' , async (req, res) => {
     try {
        const { nome, numero, email, cpf } = req.body;

        const user = await functions.getUserAtive()

        const add = await functions.addClient(nome, numero, email, cpf);

        if (add === 0) {
            return res.redirect('/dashboard/gerenclientes?erro=1');
        }

        console.log('Usuário adicionado com sucesso!');
        res.redirect('/dashboard/gerenclientes?success=1');

    } catch (error) {
        console.error(error);
        res.redirect('/dashboard/gerenclientes?erro=1');
    }
})


app.post('/dashboard/gerenclientes' , async (req, res) => {
     try {
        const {acao, id, nome, numero, email} = req.body;
        // console.log(req.body)

        if(acao === "salvar") {
            const update = await functions.updateclient(id, nome, numero, email);
            console.log("Moficado com sucesso!");
            
        }

        if (acao === "inativar") {
            await functions.inactiveCliente(id)
            console.log("Inativado com sucesso!");
               
        }
        

        // console.log('Usuário modificado com sucesso!');
        res.redirect('/dashboard/gerenclientes?success=1');

    } catch (error) {
        console.error(error);
        res.redirect('/dashboard/gerenclientes?erro=1');
    }
})

app.post('/dashboard/addproduts/add', async (req, res) => {
    try {
        const { nome } = req.body

        const add = await functions.addProduts(nome)

        if (add === 0) {
            return res.render('addproduts', {
                mensagem: 'Erro ao adicionar produto!'
            })
        }

        res.render('addproduts', {
            mensagem: 'Produto adicionado com sucesso!'
        })

    } catch (error) {
        console.error(error)
        res.render('addproduts', {
            mensagem: 'Erro interno no servidor.'
        })
    }
})
app.post('/dashboard/addproduts/alter' , async (req, res) => {
     try {
        const {acao, id, nome, preco, quantidade} = req.body;
        console.log(req.body)

        if(acao === "salvar") {
            await functions.updateProduct(id, nome, preco, quantidade);         
        }

        if (acao === "inativar") {
            await functions.inactiveProduct(id)
        }

        res.redirect('/dashboard/addproduts?success=1');


    } catch (error) {
        console.error(error);
        res.redirect('/dashboard/addproduts?erro=1');
    }
})
app.listen(port, () => {
    console.log(`http://localhost:${port}/login`);
});