import React, { useState, useEffect } from 'react';

const UserController = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [quizzes, setQuizzes] = useState([]);

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

  const fetchUserQuizzes = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${userId}`);
      const data = await response.json();
      setQuizzes(data.quizzes); // Assuming quizzes are returned as an array
    } catch (error) {
      setError('Error fetching quizzes: ' + error.message);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    fetchUserQuizzes(user.id); // Fetch quizzes when a user is clicked
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

      {/* List of Users */}
      <h2>Users</h2>
      {users.map((user) => (
        <div key={user.id}>
          <h3 onClick={() => handleUserClick(user)} style={{ cursor: 'pointer' }}>
            {user.username}
          </h3>
        </div>
      ))}

      {/* If a user is selected, show their quizzes */}
      {selectedUser && (
        <div>
          <h2>Quizzes for {selectedUser.username}</h2>
          {quizzes.length === 0 ? (
            <p>No quizzes found for this user.</p>
          ) : (
            quizzes.map((quiz) => (
              <div key={quiz.id}>
                <p>Score: {quiz.score}</p>
                <p>Correct Answers: {quiz.correct_answers}</p>
                <p>Total Questions: {quiz.total_questions}</p>
                <p>Started At: {new Date(quiz.started_at).toLocaleString()}</p>
                <p>Finished At: {quiz.finished_at ? new Date(quiz.finished_at).toLocaleString() : 'In Progress'}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default UserController;
