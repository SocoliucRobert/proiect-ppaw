import supabase from './supabaseClient';
import User from './fisiertest/User';
import Quiz from './Quiz';

class DbContext {
    async getUsers() {
        const { data, error } = await supabase.from('users').select('*');
        console.log(data);
        if (error) throw error;
        return data.map(user => new User(user.id, user.username, user.email));
    }

    async getQuizzes() {
        const { data, error } = await supabase.from('quizzes').select('*');
        if (error) throw error;
        return data.map(quiz => new Quiz(quiz.id, quiz.user_id, quiz.score, quiz.total_questions));
    }
}

export default new DbContext();
