const supabase = require('./supabaseClient');

async function runDeleteMigrations() {
    try {
        let { error } = await supabase.rpc('execute_sql', {
            sql: `ALTER TABLE users DROP COLUMN IF EXISTS age;`
        });
        if (error) throw error;

        ({ error } = await supabase.rpc('execute_sql', {
            sql: `ALTER TABLE questions DROP COLUMN IF EXISTS difficulty_level;`
        }));
        if (error) throw error;

        ({ error } = await supabase.rpc('execute_sql', {
            sql: `ALTER TABLE answers DROP COLUMN IF EXISTS explanation;`
        }));
        if (error) throw error;

        ({ error } = await supabase.rpc('execute_sql', {
            sql: `ALTER TABLE quizzes DROP COLUMN IF EXISTS time_limit;`
        }));
        if (error) throw error;
        ({ error } = await supabase.rpc('execute_sql', {
            sql: `ALTER TABLE quiz_results DROP COLUMN IF EXISTS feedback;`
        }));
        if (error) throw error;

        ({ error } = await supabase.rpc('execute_sql', {
            sql: `ALTER TABLE subscriptions DROP COLUMN IF EXISTS benefits;`
        }));
        if (error) throw error;

        ({ error } = await supabase.rpc('execute_sql', {
            sql: `ALTER TABLE contact DROP COLUMN IF EXISTS preferred_contact_method;`
        }));
        if (error) throw error;

        console.log("Ștergerea coloanelor a fost efectuată cu succes!");
    } catch (error) {
        console.error("Eroare în ștergerea coloanelor:", error);
    }
}

runDeleteMigrations();
