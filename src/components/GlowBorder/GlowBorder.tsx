import React, { CSSProperties } from 'react';
import styles from './GlowBorder.module.scss';

interface GlowBorderProps {
    reverse: boolean;
}

const GlowBorder: React.FC<GlowBorderProps> = props => {
    // Helpers
    const computeInlineStyle = (): CSSProperties => {
        const inlineStyle: CSSProperties = {};
        if (props.reverse) {
            inlineStyle.top = 0;
        } else {
            inlineStyle.bottom = 0;
        }
        return inlineStyle;
    };

    // JSX
    return (
        <div
            className={`${styles.glowBorder} ${props.reverse ? styles.reverse : ''}`}
            style={computeInlineStyle()}
        />
    );
};

export default GlowBorder;
