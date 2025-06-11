import GlowPanel from '@/components/GlowPanel/GlowPanel';
import React from 'react';
import styles from './Dashboard.module.scss';

const Dashboard: React.FC = () => {
    // JSX
    return (
        <div className={styles.dashboard}>
            <div className={`${styles.gridPanel} ${styles.panel1}`}>
                <GlowPanel>Nav Link #1</GlowPanel>
            </div>
            <div className={`${styles.gridPanel} ${styles.panel2}`}>
                <GlowPanel>Nav Link #2</GlowPanel>
            </div>
            <div className={`${styles.gridPanel} ${styles.panel3}`}>
                <GlowPanel>Nav Link #3</GlowPanel>
            </div>
            <div className={`${styles.gridPanel} ${styles.panel4}`}>
                <GlowPanel>Recent Tweet</GlowPanel>
            </div>
            <div className={`${styles.gridPanel} ${styles.panel5}`}>
                <GlowPanel>Weather</GlowPanel>
            </div>
        </div>
    );
};

export default Dashboard;
