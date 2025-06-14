import React from 'react';
import styles from './LoadingText.module.scss';

interface LoadingTextProps {
    width: string;
}

const LoadingText: React.FC<LoadingTextProps> = props => {
    // JSX
    return <div className={styles.loadingText} style={{ width: props.width }} />;
};

export default LoadingText;
