'use client';

import { supabase } from '@/lib/supabase';
import { TwitterData } from '@/utils/interfaces';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './TweetPanel.module.scss';

const TweetPanel: React.FC = () => {
    // Hooks
    const [twitterData, setTwitterData] = useState<TwitterData | null>(null);
    useEffect(() => {
        fetchTwitterData();
    }, []);

    // Helpers
    const fetchTwitterData = async () => {
        // Read access is public on the Tweet table
        const { data, error } = await supabase.from('tweet').select('*');

        if (error) {
            // TODO: introduce an error state
            console.error('Error fetching tweet data', error);
        } else {
            const tweetData = data[0];
            const fetchedTwitterData: TwitterData = {
                profilePicUrl: tweetData.profile_pic_url,
                displayName: parseEscapedEmojis(tweetData.display_name),
                tweet: parseEscapedEmojis(tweetData.tweet),
                timestamp: formatTimestamp(tweetData.timestamp),
            };
            setTwitterData(fetchedTwitterData);
        }
    };

    const parseEscapedEmojis = (text: string) => {
        // Supabase escapes the Unicode representation of emojis (i.e., \\u...) so we
        // need to escape them in case an emoji exists in the display name or tweet
        return text.replace(/\\u([0-9A-Fa-f]{4})\\u([0-9A-Fa-f]{4})/g, (_, high, low) => {
            return String.fromCharCode(parseInt(high, 16), parseInt(low, 16));
        });
    };

    const formatTimestamp = (isoString: string): string => {
        try {
            console.log(isoString);
            const date = new Date(isoString);

            // Check if date is valid
            if (isNaN(date.getTime())) {
                throw new Error('Invalid date');
            }

            const options: Intl.DateTimeFormatOptions = {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                month: 'numeric',
                day: 'numeric',
                year: '2-digit',
            };

            const formatter = new Intl.DateTimeFormat('en-US', options);
            const parts = formatter.formatToParts(date);

            // Extract parts
            const hour = parts.find(part => part.type === 'hour')?.value || '';
            const minute = parts.find(part => part.type === 'minute')?.value || '';
            const dayPeriod = parts.find(part => part.type === 'dayPeriod')?.value || '';
            const month = parts.find(part => part.type === 'month')?.value || '';
            const day = parts.find(part => part.type === 'day')?.value || '';
            const year = parts.find(part => part.type === 'year')?.value || '';

            const time = `${hour}:${minute} ${dayPeriod}`;
            const date_part = `${month}/${day}/${year}`;

            return `${time} · ${date_part}`;
        } catch (error) {
            console.error('Error formatting timestamp:', error);
            return 'Invalid date';
        }
    };

    // JSX
    // TODO: introduce a loading state
    return twitterData ? (
        <div className={styles.tweetPanel}>
            <div className={styles.profile}>
                <div className={styles.pic}>
                    <Image
                        src={twitterData.profilePicUrl}
                        alt="Twitter profile picture"
                        objectFit="contain"
                        layout="fill"
                    />
                </div>
                <div className={styles.names}>
                    <span className={styles.displayName}>{twitterData.displayName}</span>
                    <span className={styles.username}>@czhangy_</span>
                </div>
            </div>
            <p className={styles.tweet}>{twitterData.tweet}</p>
            <div className={styles.timestamp}>{twitterData.timestamp}</div>
        </div>
    ) : null;
};

export default TweetPanel;
