import supabase from '../supabaseClient';

class UserAccessor {
  async fetchUsers() {
    const { data, error } = await supabase.from('users').select('*').limit(10);
    if (error) throw new Error(error.message);
    return data;
  }

  async createUser(user) {
    const { data, error } = await supabase.from('users').insert([user]);
    if (error) throw new Error(error.message);
    return data;
  }

  async updateUser(id, updates) {
    const { data, error } = await supabase.from('users').update(updates).eq('id', id);
    if (error) throw new Error(error.message);
    return data;
  }

  async deleteUser(id) {
    const { data, error } = await supabase.from('users').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return data;
  }
}

export default UserAccessor;
