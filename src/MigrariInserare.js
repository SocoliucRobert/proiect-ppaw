const supabase = require('./supabaseClient').default;

async function runMigrationUpdates() {
    try {
        // data crearii
        let { error } = await supabase.rpc('execute_sql', { sql: `
            ALTER TABLE users ADD COLUMN created_at TIMESTAMPTZ DEFAULT NOW();
        `});
        if (error) throw error;

        // dificultate intrebare
        ({ error } = await supabase.rpc('execute_sql', { sql: `
            ALTER TABLE questions ADD COLUMN difficulty VARCHAR(50);
        `}));
        if (error) throw error;

        // indice intrebare
        ({ error } = await supabase.rpc('execute_sql', { sql: `
            CREATE INDEX idx_question_id ON answers (question_id);
        `}));
        if (error) throw error;

        // scor
        ({ error } = await supabase.rpc('execute_sql', { sql: `
            ALTER TABLE quizzes ALTER COLUMN score SET DATA TYPE INTEGER;
        `}));
        if (error) throw error;

        // schimbare constrangere
        ({ error } = await supabase.rpc('execute_sql', { sql: `
            ALTER TABLE quiz_results DROP CONSTRAINT quiz_results_quiz_id_fkey;
            ALTER TABLE quiz_results ADD CONSTRAINT quiz_results_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE SET NULL;
        `}));
        if (error) throw error;

        // data modificarii
        ({ error } = await supabase.rpc('execute_sql', { sql: `
            ALTER TABLE subscriptions ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();
        `}));
        if (error) throw error;

        // email not null
        ({ error } = await supabase.rpc('execute_sql', { sql: `
            ALTER TABLE contact ALTER COLUMN email SET NOT NULL;
        `}));
        if (error) throw error;

        console.log("Actualizările de migrare au fost efectuate cu succes!");
    } catch (error) {
        console.error("Eroare în migrare:", error);
    }
}

runMigrationUpdates();
