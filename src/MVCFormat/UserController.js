import React, { useEffect, useState } from 'react';
import UserView from './UserView';
import { UserAccessor } from './UserModel';

const userAccessor = new UserAccessor();

const UserController = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const data = await userAccessor.fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error('Eroare la încărcarea utilizatorilor:', error);
    }
  };

  const addUser = async (user) => {
    try {
      await userAccessor.createUser(user);
      loadUsers(); // Reîncarcă utilizatorii după adăugare
    } catch (error) {
      console.error('Eroare la adăugarea utilizatorului:', error);
    }
  };

  useEffect(() => {
    loadUsers(); // Încarcă utilizatorii la montarea componentului
  }, []);

  return <UserView users={users} onAddUser={addUser} />;
};

export default UserController;
