const supabase = require('../supabaseClient'); // Ensure correct path to supabaseClient.js

class UserAccessor {
  async fetchUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .limit(10); // Optional: limit results for faster loading
    if (error) throw error;
    return data;
  }

  async createUser(user) {
    const { data, error } = await supabase.from('users').insert([user]);
    if (error) throw error;
    return data;
  }

  async updateUser(id, updates) {
    const { data, error } = await supabase.from('users').update(updates).eq('id', id);
    if (error) throw error;
    return data;
  }

  async deleteUser(id) {
    const { data, error } = await supabase.from('users').delete().eq('id', id);
    if (error) throw error;
    return data;
  }
async fetchUserWithQuizzes(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('*, quizzes(*)')  // Fetch quizzes related to the user
      .eq('id', userId)
      .single();  // Get a single user
    
    if (error) throw error;
    return data;
  }
  
}

module.exports = UserAccessor;
