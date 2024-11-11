import React, { useState, useEffect } from 'react';

const UserControllerr = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({ username: '', email: '' });
  const [editUser, setEditUser] = useState(null); 
  const [editing, setEditing] = useState(false); 

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users');
      const data = await response.json();

      if (!data || data.length === 0) {
        setError('No users found');
        return;
      }

      setUsers(data);
    } catch (error) {
      setError('Error fetching users: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      if (data) {
        setUsers([...users, data]); 
        setNewUser({ username: '', email: '' }); 
      } else {
        setError('Failed to add user');
      }
    } catch (error) {
      setError('Error adding user: ' + error.message);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/users/${id}`, { method: 'DELETE' });
      setUsers(users.filter((user) => user.id !== id)); 
    } catch (error) {
      setError('Error deleting user: ' + error.message);
    }
  };

  const handleEditUser = (user) => {
    setEditUser(user); 
    setEditing(true); 
  };

  const handleUpdateUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${editUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editUser),
      });

      const data = await response.json();
      if (data) {
        setUsers(users.map((user) => (user.id === data.id ? data : user))); 
        setEditing(false); 
        setEditUser(null); 
      } else {
        setError('Failed to update user');
      }
    } catch (error) {
      setError('Error updating user: ' + error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>User Management</h1>
      <h2>Add New User</h2>
      <input
        type="text"
        placeholder="Username"
        value={newUser.username}
        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <button onClick={handleAddUser}>Add User</button>

      {editing && (
        <div>
          <h2>Edit User</h2>
          <input
            type="text"
            value={editUser.username}
            onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
          />
          <input
            type="email"
            value={editUser.email}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
          />
          <button onClick={handleUpdateUser}>Update User</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      )}

   
      <h2>Users</h2>
      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.username}</h3>
          <p>{user.email}</p>
          <button onClick={() => handleEditUser(user)}>Edit</button>
          <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default UserControllerr;
