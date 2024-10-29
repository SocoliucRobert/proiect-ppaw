const supabase = require('./supabaseClient').default;

async function runMigrations() {
    try {
        // Creare tabel users
        let { error } = await supabase.rpc('execute_sql', { sql: `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE,
                email VARCHAR(100) UNIQUE
            );
        `});
        if (error) throw error;

        // Creare tabel questions
        ({ error } = await supabase.rpc('execute_sql', { sql: `
            CREATE TABLE IF NOT EXISTS questions (
                id SERIAL PRIMARY KEY,
                category VARCHAR(50),
                question_text TEXT,
                image_url VARCHAR(255)
            );
        `}));
        if (error) throw error;

        // Creare tabel answers
        ({ error } = await supabase.rpc('execute_sql', { sql: `
            CREATE TABLE IF NOT EXISTS answers (
                id SERIAL PRIMARY KEY,
                question_id INT REFERENCES questions(id) ON DELETE CASCADE,
                answer_text TEXT,
                is_correct BOOLEAN DEFAULT FALSE
            );
        `}));
        if (error) throw error;

        // Creare tabel quizzes
        ({ error } = await supabase.rpc('execute_sql', { sql: `
            CREATE TABLE IF NOT EXISTS quizzes (
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id) ON DELETE CASCADE,
                score INT,
                total_questions INT,
                correct_answers INT,
                started_at TIMESTAMPTZ DEFAULT NOW(),
                finished_at TIMESTAMPTZ
            );
        `}));
        if (error) throw error;

        // Creare tabel quiz_results
        ({ error } = await supabase.rpc('execute_sql', { sql: `
            CREATE TABLE IF NOT EXISTS quiz_results (
                id SERIAL PRIMARY KEY,
                quiz_id INT REFERENCES quizzes(id) ON DELETE CASCADE,
                question_id INT REFERENCES questions(id) ON DELETE CASCADE,
                selected_answer_id INT REFERENCES answers(id) ON DELETE CASCADE,
                is_correct BOOLEAN
            );
        `}));
        if (error) throw error;

        // Creare tabel subscriptions
        ({ error } = await supabase.rpc('execute_sql', { sql: `
            CREATE TABLE IF NOT EXISTS subscriptions (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50),
                price DECIMAL(10, 2),
                duration_months INT,
                description TEXT
            );
        `}));
        if (error) throw error;

        // Creare tabel contact
        ({ error } = await supabase.rpc('execute_sql', { sql: `
            CREATE TABLE IF NOT EXISTS contact (
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(100),
                last_name VARCHAR(100),
                email VARCHAR(255),
                phone_number VARCHAR(20),
                message TEXT,
                created_at TIMESTAMPTZ DEFAULT NOW()
            );
        `}));
        if (error) throw error;

        console.log("Migrarea a fost efectuată cu succes!");
    } catch (error) {
        console.error("Eroare în migrare:", error);
    }
}

runMigrations();
