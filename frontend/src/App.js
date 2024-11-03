import React from 'react';
import './App.css';
import AddUserForm from './AddUserForm';
import UserListContainer from './UserListContainer';

//Componente principal da aplicação, que organiza a estrutura da interface e inclui outros componentes como o formulário e a lista de usuários.

function App() {
    return (
        <div className="App">
            <h1>Favoritos do GitHub</h1>
            <AddUserForm />
            <UserListContainer />
        </div>
    );
}

export default App;
