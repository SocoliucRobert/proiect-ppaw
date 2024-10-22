import supabase from './supabaseClient';

class UserAccessor {
    async fetchUsers() {
        const { data, error } = await supabase.from('users').select('*');
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

export { UserAccessor, QuizAccessor };
