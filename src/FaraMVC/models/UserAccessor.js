const supabase = require('../supabaseClient'); 

class UserAccessor {
  async fetchUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .limit(10); 
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
      .select('*, quizzes(*)')  
      .eq('id', userId)
      .single();  
    
    if (error) throw error;
    return data;
  }
  
}

module.exports = UserAccessor;
