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

async function saveFunFact(fact) {
    try {
        // Insert the fact into the database
        const { data, error } = await supabase
            .from('fun_facts')
            .insert([{ fact: fact.trim() }])
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

// Get fun fact from command line args
const funFact = process.argv[2];

if (!funFact) {
    console.error('❌ Please provide a fun fact as an argument');
    console.error('Usage: npm run facts "Fun fact goes here"');
    process.exit(1);
}

saveFunFact(funFact);
