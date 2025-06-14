const cron = require('node-cron');
const axios = require('axios');
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function fetchTwitterUserData() {
    try {
        console.log('📡 Fetching Twitter user data...');

        const response = await axios.get(
            'https://api.twitter.com/2/users/1358995165579337729?user.fields=profile_image_url',
            {
                headers: {
                    Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
                },
            }
        );

        const user = response.data;
        console.log(`📝 Fetched user data`);

        // Prepare data for Supabase
        const userData = {
            profile_pic_url: user.profile_image_url,
            display_name: user.name,
        };

        // Insert into Supabase
        const { data, error } = await supabase.from('tweets').update(userData).eq('id', 1).select();

        if (error) {
            console.error('❌ Supabase error:', error);
            throw error;
        }

        console.log(`✅ Successfully saved user data to Supabase`);
        return data;
    } catch (error) {
        console.error('❌ Error fetching user data:', error.message);
        throw error;
    }
}

async function fetchRecentTweet() {
    try {
        console.log('🐦 Fetching latest tweets...');

        const response = await axios.get(
            'https://api.x.com/2/users/1358995165579337729/tweets?max_results=5&tweet.fields=created_at',
            {
                headers: {
                    Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
                },
            }
        );

        const tweets = response.data.data || [];
        console.log(`📝 Fetched recent tweets`);

        if (tweets.length === 0) {
            console.log('No tweets found');
            return;
        }

        // Prepare data for Supabase
        const recentTweet = tweets[0];
        const tweetData = {
            tweet: recentTweet.text,
            timestamp: recentTweet.created_at,
        };

        // Insert into Supabase
        const { data, error } = await supabase
            .from('tweets')
            .update(tweetData)
            .eq('id', 1)
            .select();

        if (error) {
            console.error('❌ Supabase error:', error);
            throw error;
        }

        console.log(`✅ Successfully saved recent tweet to Supabase`);
        return data;
    } catch (error) {
        console.error('❌ Error fetching tweets:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
        throw error;
    }
}

// Fetch user data: Every 36 hours
cron.schedule(
    '0 */36 * * *',
    async () => {
        console.log('⏰ User data cron triggered at:', new Date().toISOString());
        try {
            await fetchTwitterUserData();
        } catch (error) {
            console.error('User data cron failed:', error.message);
        }
    },
    {
        scheduled: true,
        timezone: 'UTC',
    }
);

// Fetch recent tweet: Every other day at 12am PST (8am UTC)
cron.schedule(
    '0 8 */2 * *',
    async () => {
        console.log('⏰ Recent tweets cron triggered at:', new Date().toISOString());
        try {
            await fetchTweetsAndSave();
        } catch (error) {
            console.error('Recent tweets cron failed:', error.message);
        }
    },
    {
        scheduled: true,
        timezone: 'UTC',
    }
);

// Health check and manual trigger endpoints
app.get('/', (_, res) => {
    res.json({
        status: 'healthy',
        service: 'twitter-cron',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        crons: {
            userProfile: 'Every 36 hours',
            tweets: 'Every other day at 12am PST',
        },
    });
});

app.get('/trigger/user', async (_, res) => {
    try {
        const data = await fetchTwitterUserData();
        res.json({ success: true, data, timestamp: new Date().toISOString() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/trigger/tweets', async (_, res) => {
    try {
        const data = await fetchRecentTweet();
        res.json({ success: true, data, timestamp: new Date().toISOString() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🌐 Server running on port ${PORT}`);
    console.log('⏰ Cron jobs scheduled:');
    console.log('  - User profile: Every 36 hours');
    console.log('  - Recent tweet: Every other day at 12am PST (8am UTC)');
});
