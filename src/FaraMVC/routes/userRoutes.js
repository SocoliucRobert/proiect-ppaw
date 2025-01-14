const express = require('express');
const UserAccessor = require('../../models/UserAccessor');  
const { fetchUserWithQuizzes, fetchUsers } = require('../controllers/userController');

const router = express.Router();
const userAccessor = new UserAccessor();

// GET
router.get('/users', async (req, res) => {
  try {
    const users = await userAccessor.fetchUsers();
    res.json(users);  
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});


// CREATE
router.post('/users', async (req, res) => {
  try {
    const newUser = await userAccessor.createUser(req.body);
    res.status(201).json(newUser);  
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// PUT
router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;
    try {
      const updatedUser = await userAccessor.updateUser(id, { username, email });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // DELETE
router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deletedUser = await userAccessor.deleteUser(id);
      res.status(200).json(deletedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  router.get('/users', fetchUsers);
  router.get('/users/:id', fetchUserWithQuizzes);

module.exports = router;
