import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey: string = process.env.SUPABASE_SECRET_KEY!;
const twitterBearerToken: string = process.env.TWITTER_BEARER_TOKEN!;

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export async function GET(): Promise<NextResponse> {
    try {
        // Get user data
        const userResponse = await fetch(
            'https://api.twitter.com/2/users/by/username/falco?user.fields=profile_image_url',
            {
                headers: {
                    Authorization: `Bearer ${twitterBearerToken}`,
                },
            }
        );
        if (!userResponse.ok) {
            throw new Error(
                `Twitter user API error: ${userResponse.status} ${userResponse.statusText}`
            );
        }

        // Parse user data
        const userData = (await userResponse.json()).data;
        const userId = userData.id;
        console.log(`Twitter user API response: ${JSON.stringify(userData)}`);

        // Get latest tweet
        const tweetResponse = await fetch(
            `https://api.x.com/2/users/${userId}/tweets?max_results=5&tweet.fields=created_at`,
            { headers: { Authorization: `Bearer ${twitterBearerToken}` } }
        );
        if (!tweetResponse.ok) {
            throw new Error(
                `Twitter tweet API error: ${tweetResponse.status} ${tweetResponse.statusText}`
            );
        }

        // Parse tweet data
        const tweetData = (await tweetResponse.json()).data[0];
        console.log(`Twitter tweet API response: ${JSON.stringify(tweetData)}`);

        // Prepare record for Supabase
        const tweetRecord = {
            profile_pic_url: userData.profile_image_url,
            display_name: userData.name,
            tweet: tweetData.text,
            timestamp: tweetData.created_at,
        };

        console.log('Prepared Twitter data:', tweetRecord);

        // Save to Supabase
        const { data, error } = await supabase.from('tweet').update(tweetRecord).eq('id', 1);

        if (error) {
            throw new Error(`Supabase error: ${error.message}`);
        }

        console.log('Successfully saved Twitter data to Supabase:', data);

        return NextResponse.json({
            success: true,
            message: 'Twitter data fetched and saved successfully',
            data: data,
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        console.error('Cron job error:', error);
        return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }
}
