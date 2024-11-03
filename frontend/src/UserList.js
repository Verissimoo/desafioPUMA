import React from 'react';
import './UserList.css'; 

// Apresenta a lista de usuários favoritos, exibindo informações e opções de interação, como adicionar estrelas.

const UserList = ({ users, onToggleStar }) => (
    <ul>
        {users.map(user => (
            <li key={user.username}>
                <img src={user.avatar} alt={`${user.name}'s avatar`} />
                <p>{user.name} ({user.username})</p>
                <div
                    className={`star ${user.starred ? 'active' : ''}`}
                    onClick={() => onToggleStar(user.username)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && onToggleStar(user.username)}
                >
                    ★
                </div>
                {/* Link para o perfil do GitHub do usuário */}
                <a href={user.url} target="_blank" rel="noopener noreferrer" id="github-link">
                    GitHub
                </a>
            </li>
        ))}
    </ul>
);

export default UserList;

