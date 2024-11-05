import React, { useState } from 'react';

const UserView = ({ users, onAddUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email) return; // Verificare dacă username și email sunt completate
    onAddUser({ username, email }); // Schimbă name la username
    setUsername(''); // Resetează câmpul username
    setEmail(''); // Resetează câmpul email
  };

  return (
    <div>
      <h1>Utilizatori</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username" // Schimbă mesajul sugestiv
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Actualizare corectă a valorii username
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Actualizare corectă a valorii email
        />
        <button type="submit">Adaugă Utilizator</button>
      </form>
      <ul>
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>{user.username} - {user.email}</li> // Schimbă name la username
          ))
        ) : (
          <li>Nu există utilizatori.</li>
        )}
      </ul>
    </div>
  );
};

export default UserView;
