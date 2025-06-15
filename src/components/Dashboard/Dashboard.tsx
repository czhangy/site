import GlowPanel from '@/components/GlowPanel/GlowPanel';
import NavPanel from '@/components/NavPanel/NavPanel';
import TweetPanel from '@/components/TweetPanel/TweetPanel';
import WeatherPanel from '@/components/WeatherPanel/WeatherPanel';
import { LINK_ITEMS } from '@/utils/constants';
import React from 'react';
import styles from './Dashboard.module.scss';

const Dashboard: React.FC = () => {
    // JSX
    return (
        <div className={styles.dashboard}>
            <div className={`${styles.gridPanel} ${styles.projectsNav}`}>
                <NavPanel linkItem={LINK_ITEMS[1]} />
            </div>
            <div className={`${styles.gridPanel} ${styles.journalsNav}`}>
                <NavPanel linkItem={LINK_ITEMS[2]} />
            </div>
            <div className={`${styles.gridPanel} ${styles.workNav}`}>
                <NavPanel linkItem={LINK_ITEMS[3]} />
            </div>
            <div className={`${styles.gridPanel} ${styles.weather}`}>
                <GlowPanel>
                    <WeatherPanel />
                </GlowPanel>
            </div>
            <div className={`${styles.gridPanel} ${styles.latestTweet}`}>
                <GlowPanel>
                    <TweetPanel />
                </GlowPanel>
            </div>
            <div className={`${styles.gridPanel} ${styles.funFact}`}>
                <GlowPanel>fun fact</GlowPanel>
            </div>
            <div className={`${styles.gridPanel} ${styles.tbd}`}>
                <GlowPanel>tbd</GlowPanel>
            </div>
        </div>
    );
};

export default Dashboard;
