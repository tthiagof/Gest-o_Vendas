# 📊 Sistema de Controle de Vendas e Estoque

Sistema desenvolvido para **gerenciamento de vendas, clientes, produtos e estoque**, com foco em organização, clareza de fluxo e separação de responsabilidades. O projeto foi pensado para representar, de forma objetiva, o funcionamento de um sistema comercial completo.

---

## 🧠 Visão Geral do Sistema

O sistema centraliza as principais rotinas de uma operação de vendas, permitindo o controle integrado entre **cadastros**, **movimentações** e **estoque**. A lógica do projeto foi construída para que cada ação reflita diretamente no estado do sistema, evitando inconsistências e facilitando a manutenção.

A aplicação segue um modelo organizado, onde cada camada possui uma responsabilidade bem definida, tornando o funcionamento do sistema fácil de entender e apresentar.

---

## 🔄 Funcionamento Geral

O fluxo do sistema ocorre da seguinte forma:

1. O usuário acessa o sistema e realiza a autenticação
2. Após autenticado, pode gerenciar clientes e produtos
3. Cada venda registrada associa cliente e produto
4. O estoque é atualizado automaticamente a cada venda
5. Os dados permanecem organizados no banco de dados para consulta e controle

Esse fluxo garante consistência entre vendas e estoque, evitando registros manuais e erros comuns em controles informais.

---

## 🧩 Arquitetura e Organização

O projeto foi estruturado seguindo boas práticas de separação de responsabilidades:

* **Rotas**: responsáveis por receber as requisições e direcionar o fluxo
* **Repositórios**: camada responsável pelo acesso ao banco de dados
* **Views**: interface renderizada para o usuário
* **Configurações**: centralizam conexões e ajustes do sistema

Essa divisão facilita a leitura do código e permite que novas funcionalidades sejam adicionadas sem impactar o restante do sistema.

---

## 📦 Principais Módulos

### 👤 Autenticação

* Validação de usuários
* Controle de acesso ao sistema
* Senhas armazenadas de forma segura

### 🧾 Clientes

* Cadastro e gerenciamento de clientes
* Busca e organização das informações

### 📦 Produtos e Estoque

* Cadastro de produtos
* Controle de quantidade disponível
* Atualização automática conforme vendas

### 💰 Vendas

* Registro de vendas
* Associação entre cliente e produto
* Impacto direto no estoque

---

## 🛠️ Tecnologias Utilizadas

* **Node.js**
* **Express.js**
* **MySQL**
* **EJS**
* **Tailwind CSS**
* **Git & GitHub**

As tecnologias foram escolhidas visando simplicidade, aprendizado e clareza na apresentação do funcionamento do sistema.

---

## 🎯 Objetivo do Projeto

Este projeto tem como objetivo demonstrar:

* A construção de um sistema de controle comercial
* Organização de código backend em camadas
* Integração entre vendas e estoque
* Aplicação de boas práticas iniciais em Node.js

É ideal para **apresentação técnica**, **portfólio** ou **base para projetos maiores**.

---

## 👨‍💻 Autor

Desenvolvido por **Thiago Ferreira**
GitHub: [https://github.com/tthiagof](https://github.com/tthiagof)