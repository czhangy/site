require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;
const googleApiKey = process.env.GOOGLE_KEY;

if (!supabaseUrl || !supabaseKey || !googleApiKey) {
    console.log(supabaseUrl, supabaseKey, googleApiKey);
    console.error('❌ Missing required environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function geocodeAndSave(cityName) {
    try {
        console.log(`🔍 Geocoding "${cityName}"...`);

        // Call Google Geocoding API
        const encodedCity = encodeURIComponent(cityName);
        const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedCity}&key=${googleApiKey}`;

        const response = await fetch(geocodingUrl);
        const data = await response.json();

        if (data.status !== 'OK') {
            throw new Error(
                `Google Geocoding API error: ${data.status} - ${data.error_message || 'Unknown error'}`
            );
        }

        if (!data.results || data.results.length === 0) {
            throw new Error(`No results found for "${cityName}"`);
        }

        // Extract coordinates from first result
        const location = data.results[0].geometry.location;
        const latitude = location.lat;
        const longitude = location.lng;

        console.log(`📍 Found coordinates:`);
        console.log(`   Latitude: ${latitude}`);
        console.log(`   Longitude: ${longitude}`);

        // Save to Supabase (upsert with id = 1)
        console.log('💾 Saving to Supabase...');

        const { _, error } = await supabase
            .from('location')
            .update({
                city_name: cityName,
                latitude: latitude,
                longitude: longitude,
            })
            .eq('id', 1)
            .select();

        if (error) {
            throw new Error(`Supabase error: ${error.message}`);
        }

        console.log('✅ Successfully saved to Supabase!');
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

// Get city name from command line arguments
const cityName = process.argv[2];

if (!cityName) {
    console.error('❌ Please provide a city name as an argument');
    console.error('Usage: npm run geocode "San Francisco"');
    process.exit(1);
}

// Run the geocoding function
geocodeAndSave(cityName);
