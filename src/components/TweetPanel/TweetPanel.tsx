'use client';

import { fetchSingleRow } from '@/utils/helpers';
import { TwitterData } from '@/utils/interfaces';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import LoadingText from '../LoadingText/LoadingText';
import styles from './TweetPanel.module.scss';

const TweetPanel: React.FC = () => {
    // Hooks
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [twitterData, setTwitterData] = useState<TwitterData | null>(null);
    useEffect(() => {
        const fetchTwitterData = async () => {
            setIsLoading(true);

            // Read access is public on the Tweet table
            const data = await fetchSingleRow('tweet');

            if (data) {
                const fetchedTwitterData: TwitterData = {
                    profilePicUrl: data.profile_pic_url,
                    displayName: parseEscapedEmojis(data.display_name),
                    tweet: parseEscapedEmojis(data.tweet),
                    timestamp: formatTimestamp(data.timestamp),
                };
                setTwitterData(fetchedTwitterData);
            } else {
                setIsError(true);
            }

            setIsLoading(false);
        };

        fetchTwitterData();
    }, []);

    // Helpers
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

    const renderProfilePic = () => {
        if (isError) {
            return (
                <div className={styles.pic}>
                    <Image
                        src="/placeholder.webp"
                        alt="Twitter profile picture"
                        objectFit="contain"
                        layout="fill"
                    />
                </div>
            );
        } else if (isLoading || !twitterData) {
            return (
                <div className={styles.pic}>
                    <div className={styles.loadingPic} />
                </div>
            );
        } else {
            return (
                <div className={styles.pic}>
                    <Image
                        src={twitterData.profilePicUrl}
                        alt="Twitter profile picture"
                        objectFit="contain"
                        layout="fill"
                    />
                </div>
            );
        }
    };

    const renderDisplayName = () => {
        if (isError) {
            return <span className={styles.displayName}>Charles Zhang</span>;
        } else if (isLoading || !twitterData) {
            return <LoadingText width="100px" />;
        } else {
            return <span className={styles.displayName}>{twitterData.displayName}</span>;
        }
    };

    const renderUsername = () => {
        if (isError) {
            return <span className={styles.username}>@czhangy_</span>;
        } else if (isLoading || !twitterData) {
            return <LoadingText width="90px" />;
        } else {
            return <span className={styles.username}>@czhangy_</span>;
        }
    };

    const renderTweet = () => {
        if (isError) {
            return (
                <p className={styles.tweet}>
                    something went wrong while fetching my latest tweet. fuck you twitter.
                </p>
            );
        } else if (isLoading || !twitterData) {
            return (
                <div className={`${styles.tweet} ${styles.loadingTweet}`}>
                    <LoadingText width="100%" />
                    <LoadingText width="100%" />
                    <LoadingText width="100%" />
                </div>
            );
        } else {
            return <p className={styles.tweet}>{twitterData.tweet}</p>;
        }
    };

    const renderTimestamp = () => {
        if (isError) {
            return <p className={styles.timestamp}>12:00 AM · 1/1/70</p>;
        } else if (isLoading || !twitterData) {
            return <LoadingText width="125px" />;
        } else {
            return <p className={styles.timestamp}>{twitterData.timestamp}</p>;
        }
    };

    // JSX
    // TODO: introduce a loading state
    return (
        <div className={styles.tweetPanel}>
            <div className={styles.profile}>
                {renderProfilePic()}
                <div className={`${styles.names} ${isLoading ? styles.loadingNames : ''}`}>
                    {renderDisplayName()}
                    {renderUsername()}
                </div>
            </div>
            <div className={styles.tweetContainer}>{renderTweet()}</div>
            {renderTimestamp()}
        </div>
    );
};

export default TweetPanel;
