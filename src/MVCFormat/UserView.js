import React, { useState } from 'react';

const UserView = ({ users, onAddUser, onUpdateUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [editingUserId, setEditingUserId] = useState(null); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email) return;

    if (editingUserId) {
      onUpdateUser({ id: editingUserId, username, email }); 
      setEditingUserId(null); 
    } else {
      onAddUser({ username, email }); 
    }

    setUsername('');
    setEmail('');
  };

  const handleEdit = (user) => {
    setUsername(user.username);
    setEmail(user.email);
    setEditingUserId(user.id); 
  };

  return (
    <div>
      <h1>Utilizatori</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit2">{editingUserId ? 'Actualizează Utilizator' : 'Adaugă Utilizator'}</button>
      </form>
      <ul>
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              {user.username} - {user.email}
              <button onClick={() => handleEdit(user)}>Editează</button>
            </li>
          ))
        ) : (
          <li>Nu există utilizatori.</li>
        )}
      </ul>
    </div>
  );
};

export default UserView;
