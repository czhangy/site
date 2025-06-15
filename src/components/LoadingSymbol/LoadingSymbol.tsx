import React from 'react';
import styles from './LoadingSymbol.module.scss';

const LoadingSymbol: React.FC = () => {
    // JSX
    return (
        <div className={styles.loadingSymbol}>
            <div className={styles.dot} style={{ animationDelay: '0s' }} />
            <div className={styles.dot} style={{ animationDelay: '0.2s' }} />
            <div className={styles.dot} style={{ animationDelay: '0.4s' }} />
        </div>
    );
};

export default LoadingSymbol;
