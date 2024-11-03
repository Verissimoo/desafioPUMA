const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

//Gerencia as rotas para manipulação dos usuários favoritos, incluindo adição, remoção e listagem.

const dataFilePath = path.join(__dirname, '../data.json');

const loadFavorites = () => {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Erro ao carregar o arquivo JSON:', error);
        return [];
    }
};

const saveFavorites = (favorites) => {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(favorites, null, 2));
    } catch (error) {
        console.error('Erro ao salvar o arquivo JSON:', error);
    }
};

//Adicionar um usuário à lista de favoritos
router.post('/', async (req, res) => {
    const { username } = req.body;
    let favorites = loadFavorites();

    //Limitar os 5 usuarios
    if (favorites.length >= 5) {
        return res.status(400).json({ error: 'Limite de 5 favoritos alcançado' });
    }

    //Ver se usuarios ja ta na lista
    if (favorites.find(user => user.username === username)) {
        return res.status(400).json({ error: 'Usuário já está na lista de favoritos' });
    }

    try {
        //Busca o usuário na API do GitHub
        const response = await axios.get(`https://api.github.com/users/${username}`);
        const { login, name, avatar_url, html_url } = response.data;

        // Adiciona o usuário à lista e salva
        favorites.push({ username: login, name, avatar: avatar_url, url: html_url, starred: false });
        saveFavorites(favorites);
        res.status(201).json({ message: 'Usuário adicionado com sucesso' });
    } catch (error) {
        res.status(404).json({ error: 'Usuário não encontrado no GitHub' });
    }
});

//Listar os usuários favoritos
router.get('/', (req, res) => {
    const favorites = loadFavorites();
    res.json(favorites);
});

//Remover 
router.delete('/:username', (req, res) => {
    const { username } = req.params;
    let favorites = loadFavorites();

    favorites = favorites.filter(user => user.username !== username);
    saveFavorites(favorites);
    res.json({ message: 'Usuário removido com sucesso' });
});

// Alternar estrela de um usuário na lista de favoritos
router.patch('/:username/toggle-star', (req, res) => {
    const { username } = req.params;
    let favorites = loadFavorites();

    const user = favorites.find(user => user.username === username);
    if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado na lista de favoritos' });
    }

    favorites = favorites.map(u => ({
        ...u,
        starred: u.username === username ? !u.starred : false
    }));
    saveFavorites(favorites);

    res.json({ message: 'Status da estrela atualizado com sucesso' });
});

module.exports = router;
