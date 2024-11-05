import React, { useEffect, useState } from 'react'; 
import UserAccessor from './UserModel';
import UserView from './UserView';

const UserController = () => {
  const [users, setUsers] = useState([]);
  const userAccessor = new UserAccessor();

  const loadUsers = async () => {
    try {
      const data = await userAccessor.fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error('Eroare la încărcarea utilizatorilor:', error);
    }
  };

  const handleAddUser = async (user) => {
    try {
      await userAccessor.createUser(user);
      loadUsers(); 
    } catch (error) {
      console.error('Eroare la adăugarea utilizatorului:', error);
    }
  };

  const handleUpdateUser = async (user) => {
    try {
      await userAccessor.updateUser(user.id, { username: user.username, email: user.email });
      loadUsers();
    } catch (error) {
      console.error('Eroare la actualizarea utilizatorului:', error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <UserView users={users} onAddUser={handleAddUser} onUpdateUser={handleUpdateUser} />
  );
};

export default UserController;
