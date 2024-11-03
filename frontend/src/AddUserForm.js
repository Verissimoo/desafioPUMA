import React, { useState } from 'react';
import axios from 'axios';

//Componente de formulário para adicionar um novo usuário à lista de favoritos, enviando dados para a API.

const AddUserForm = () => {
    const [username, setUsername] = useState('');

    const addUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/users', { username });
            setUsername('');
        } catch (error) {
            console.error('Erro ao adicionar usuário:', error);
        }
    };

    return (
        <form onSubmit={addUser}>
            <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Username do GitHub" 
                required 
            />
            <button type="submit">Adicionar</button>
        </form>
    );
};

export default AddUserForm;
