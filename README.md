# Loja Virtual de Inglês

Este é um projeto de loja virtual com front-end em React e back-end em Node.js com SQLite. Ele foi desenvolvido para fins educacionais.

## 📁 Estrutura do Projeto

```
loja_virtual_ingles/
│
├── backend/            # API REST (Node.js + Express + SQLite)
│   ├── config/         # Configuração do banco de dados
│   ├── controllers/    # Lógica de controle das rotas
│   ├── models/         # Acesso ao banco de dados
│   ├── routes/         # Endpoints da API
│   ├── seed.js         # Popula o banco com dados iniciais
│   ├── server.js       # Inicia o servidor
│   └── package.json    # Configuração do projeto Node.js
│
├── project/            # Front-end em React (já existente)
│
└── README.md           # Este arquivo
```

## 🚀 Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org)
- [npm](https://www.npmjs.com/)

### 1. Instalar dependências do back-end

```bash
cd backend
npm install
```

### 2. Rodar seed para gerar dados iniciais

```bash
npm run seed
```

### 3. Iniciar o servidor back-end

```bash
npm run dev
```

O servidor ficará disponível em `http://localhost:5000`.

### 4. Rodar o front-end

Abra outro terminal:

```bash
cd project
npm install
npm start
```

O front-end estará disponível em `http://localhost:3000` e se comunicará com o back-end.

---

## 🔗 API Endpoints

- `GET /api/products` → Lista todos os produtos
- `GET /api/categories` → Lista todas as categorias

---

## 🛠 Tecnologias

- React
- Node.js
- Express
- SQLite
- JavaScript

---

## 📦 Pronto para entrega

A estrutura está empacotada e pronta para uso. Basta extrair o `.zip` e seguir os passos acima.

---

Desenvolvido para fins educacionais.