'use client';

import React, { useRef, useState } from 'react';
import styles from './GlowPanel.module.scss';

interface GlowPanelInterface {
    children: React.ReactNode;
}

const GlowPanel: React.FC<GlowPanelInterface> = props => {
    // Hooks
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Helpers
    const handleMouseMove = (e: React.MouseEvent) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };
    const handleMouseEnter = () => {
        setIsHovering(true);
    };
    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    // JSX
    return (
        <div className={styles.glowPanel}>
            <div
                ref={containerRef}
                className={styles.glowPanelContainer}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div
                    className={`${styles.glowOverlay} ${isHovering ? styles.active : ''}`}
                    style={
                        {
                            '--mouse-x': `${mousePosition.x}px`,
                            '--mouse-y': `${mousePosition.y}px`,
                        } as React.CSSProperties
                    }
                />
                {props.children}
            </div>
        </div>
    );
};

export default GlowPanel;
