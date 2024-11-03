const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

//Configura o servidor Express e define as rotas da API, permitindo a comunicação entre o frontend e o backend.

app.use(express.json());
app.use(cors());

// Importa as rotas
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});