import supabase from '../supabaseClient';

// Clasele pentru fiecare entitate

class UserAccessor {
  async fetchUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      
      .limit(10); // Limitare pentru incarcare mai rapida
    if (error) throw error;
    return data;
  }

  async fetchUsersWithDetails() {
    const { data, error } = await supabase
      .from('users')
      .select('*, subscriptions(*), quiz_results(*)'); // Eager loading pentru a aduce relatiile
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
}

class QuestionAccessor {
  async fetchQuestions() {
    const { data, error } = await supabase.from('questions').select('*');
    if (error) throw error;
    return data;
  }

  async createQuestion(question) {
    const { data, error } = await supabase.from('questions').insert([question]);
    if (error) throw error;
    return data;
  }

  async updateQuestion(id, updates) {
    const { data, error } = await supabase.from('questions').update(updates).eq('id', id);
    if (error) throw error;
    return data;
  }

  async deleteQuestion(id) {
    const { data, error } = await supabase.from('questions').delete().eq('id', id);
    if (error) throw error;
    return data;
  }
}

class AnswerAccessor {
  async fetchAnswers() {
    const { data, error } = await supabase.from('answers').select('*');
    if (error) throw error;
    return data;
  }

  async createAnswer(answer) {
    const { data, error } = await supabase.from('answers').insert([answer]);
    if (error) throw error;
    return data;
  }

  async updateAnswer(id, updates) {
    const { data, error } = await supabase.from('answers').update(updates).eq('id', id);
    if (error) throw error;
    return data;
  }

  async deleteAnswer(id) {
    const { data, error } = await supabase.from('answers').delete().eq('id', id);
    if (error) throw error;
    return data;
  }
}

class QuizAccessor {
  async fetchQuizzes() {
    const { data, error } = await supabase.from('quizzes').select('*');
    if (error) throw error;
    return data;
  }

  async createQuiz(quiz) {
    const { data, error } = await supabase.from('quizzes').insert([quiz]);
    if (error) throw error;
    return data;
  }

  async updateQuiz(id, updates) {
    const { data, error } = await supabase.from('quizzes').update(updates).eq('id', id);
    if (error) throw error;
    return data;
  }

  async deleteQuiz(id) {
    const { data, error } = await supabase.from('quizzes').delete().eq('id', id);
    if (error) throw error;
    return data;
  }
}

class QuizResultAccessor {
  async fetchQuizResults() {
    const { data, error } = await supabase.from('quiz_results').select('*');
    if (error) throw error;
    return data;
  }

  async createQuizResult(quizResult) {
    const { data, error } = await supabase.from('quiz_results').insert([quizResult]);
    if (error) throw error;
    return data;
  }

  async updateQuizResult(id, updates) {
    const { data, error } = await supabase.from('quiz_results').update(updates).eq('id', id);
    if (error) throw error;
    return data;
  }

  async deleteQuizResult(id) {
    const { data, error } = await supabase.from('quiz_results').delete().eq('id', id);
    if (error) throw error;
    return data;
  }
}

class SubscriptionAccessor {
  async fetchSubscriptions() {
    const { data, error } = await supabase.from('subscriptions').select('*');
    if (error) throw error;
    return data;
  }

  async createSubscription(subscription) {
    const { data, error } = await supabase.from('subscriptions').insert([subscription]);
    if (error) throw error;
    return data;
  }

  async updateSubscription(id, updates) {
    const { data, error } = await supabase.from('subscriptions').update(updates).eq('id', id);
    if (error) throw error;
    return data;
  }

  async deleteSubscription(id) {
    const { data, error } = await supabase.from('subscriptions').delete().eq('id', id);
    if (error) throw error;
    return data;
  }
}

class ContactAccessor {
  async fetchContacts() {
    const { data, error } = await supabase.from('contact').select('*');
    if (error) throw error;
    return data;
  }

  async createContact(contact) {
    const { data, error } = await supabase.from('contact').insert([contact]);
    if (error) throw error;
    return data;
  }

  async updateContact(id, updates) {
    const { data, error } = await supabase.from('contact').update(updates).eq('id', id);
    if (error) throw error;
    return data;
  }

  async deleteContact(id) {
    const { data, error } = await supabase.from('contact').delete().eq('id', id);
    if (error) throw error;
    return data;
  }
}

export { 
  UserAccessor, 
  QuestionAccessor, 
  AnswerAccessor, 
  QuizAccessor, 
  QuizResultAccessor, 
  SubscriptionAccessor, 
  ContactAccessor 
};
