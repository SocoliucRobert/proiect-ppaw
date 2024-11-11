// userController.js
const UserAccessor = require('../models/UserAccessor'); // Assuming you have this accessor class

const userAccessor = new UserAccessor();

const fetchUsers = async (req, res) => {
  try {
    const users = await userAccessor.fetchUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users: ' + error.message });
  }
};

const fetchUserWithQuizzes = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userAccessor.fetchUserWithQuizzes(id); // Assuming you have this method
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user); // Return the user along with quizzes
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user with quizzes: ' + error.message });
  }
};

module.exports = { fetchUsers, fetchUserWithQuizzes };
