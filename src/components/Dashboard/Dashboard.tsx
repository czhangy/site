import GlowPanel from '@/components/GlowPanel/GlowPanel';
import NavPanel from '@/components/NavPanel/NavPanel';
import { LINK_ITEMS } from '@/utils/constants';
import React from 'react';
import styles from './Dashboard.module.scss';

const Dashboard: React.FC = () => {
    // JSX
    return (
        <div className={styles.dashboard}>
            <div className={`${styles.gridPanel} ${styles.panel1}`}>
                <GlowPanel>
                    <NavPanel linkItem={LINK_ITEMS[1]} />
                </GlowPanel>
            </div>
            <div className={`${styles.gridPanel} ${styles.panel2}`}>
                <GlowPanel>
                    <NavPanel linkItem={LINK_ITEMS[2]} />
                </GlowPanel>
            </div>
            <div className={`${styles.gridPanel} ${styles.panel3}`}>
                <GlowPanel>
                    <NavPanel linkItem={LINK_ITEMS[3]} />
                </GlowPanel>
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
