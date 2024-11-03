// src/UserListContainer.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserList from './UserList';

//Container que gerencia o estado da lista de usuários e a lógica de busca, conectando o frontend à API para obter dados.

const UserListContainer = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users');
                setUsers(response.data); // Armazenando os usuários obtidos na variável de estado
            } catch (error) {   
                console.error("Erro ao buscar usuários:", error);
            }
        };
        fetchUsers();
    }, []);

    const handleToggleStar = async (username) => {
        try {
            await axios.patch(`http://localhost:3000/users/${username}/toggle-star`);
            const updatedUsers = users.map(user => {
                // Define o usuário atual como estrelado e todos os outros como não estrelados
                return user.username === username ? { ...user, starred: true } : { ...user, starred: false };
            });
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Erro ao alternar a estrela:', error);
        } }

    return <UserList users={users} onToggleStar={handleToggleStar} />;
};

export default UserListContainer;
