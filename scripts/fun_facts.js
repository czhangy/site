require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.log(supabaseUrl, supabaseKey);
    console.error('❌ Missing required environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function saveFunFact(fact, emoji) {
    try {
        // Insert the fact into the database
        const { data, error } = await supabase
            .from('fun_facts')
            .insert([{ fact: fact.trim(), emoji: emoji.trim() }])
            .select(); // Return the inserted row

        if (error) {
            throw error;
        }

        console.log('✅ Fun fact saved successfully!');
        console.log('Inserted data:', data);

        return {
            success: true,
            data: data,
            message: 'Fun fact saved successfully',
        };
    } catch (error) {
        console.error('❌ Error saving fun fact:', error.message);

        return {
            success: false,
            error: error.message,
            message: 'Failed to save fun fact',
        };
    }
}

// Get command line args
const funFact = process.argv[2];

// Get custom arg
const emoji = '';

if (!funFact) {
    console.error('❌ Please provide a fun fact as an argument');
    console.error('Usage: npm run facts <FUN_FACT>');
    process.exit(1);
}

if (emoji === '') {
    console.error('❌ Please provide an emoji in the script source');
    process.exit(1);
}

saveFunFact(funFact, emoji);
