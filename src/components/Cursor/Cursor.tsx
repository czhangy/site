'use client';

import { Coords } from '@/utils/interfaces';
import React, { useState } from 'react';
import styles from './Cursor.module.scss';

const Cursor: React.FC = () => {
    // Hooks
    const [mousePosition, setMousePosition] = useState<Coords>({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState<boolean>(false);

    // Helpers
    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
    };

    const handleMouseEnter = () => {
        setIsVisible(true);
    };

    // JSX
    return (
        <>
            <div
                className={styles.overlay}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            <div
                className={`${styles.cursor} ${isVisible ? styles.visible : ''}`}
                style={{
                    left: mousePosition.x - 35,
                    top: mousePosition.y - 35,
                }}
            />
        </>
    );
};

export default Cursor;
