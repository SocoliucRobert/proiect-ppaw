import supabase from '../supabaseClient';

class UserAccessor {
  async fetchUsers() {
    const { data, error } = await supabase.from('users').select('*');
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
}

class AnswerAccessor {
  async fetchAnswers() {
    const { data, error } = await supabase.from('answers').select('*');
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
}

class QuizResultAccessor {
  async fetchQuizResults() {
    const { data, error } = await supabase.from('quiz_results').select('*');
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
}

class ContactAccessor {
  async fetchContacts() {
    const { data, error } = await supabase.from('contact').select('*');
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
