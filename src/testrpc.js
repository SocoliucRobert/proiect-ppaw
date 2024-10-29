const supabase = require('./supabaseClient');

async function testExecuteSql() {
    const { data, error } = await supabase.rpc('execute_sql', {
        sql: `
            CREATE TABLE IF NOT EXISTS test_table (
                id SERIAL PRIMARY KEY,
                name TEXT
            );
        `
    });

    if (error) {
        console.error('Error executing SQL:', error);
    } else {
        console.log('SQL executed successfully:', data);
    }
}

testExecuteSql();
