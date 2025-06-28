// components/Timeline.tsx
'use client';

import { WORK_EXPERIENCES } from '@/utils/constants';
import { useEffect, useState } from 'react';
import TimelineItem from '../TimelineItem/TimelineItem';
import styles from './Timeline.module.scss';

const Timeline: React.FC = () => {
    // Hooks
    const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
    useEffect(() => {
        let observer: IntersectionObserver;
        if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
            // Set observer for in-view animations
            observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const id = entry.target.getAttribute('data-id');
                            if (id) {
                                setVisibleItems(prev => new Set([...prev, id]));
                            }
                        }
                    });
                },
                { threshold: 0.3 }
            );

            const timelineItems = document.querySelectorAll('[data-id]');
            timelineItems.forEach(item => observer.observe(item));
        }

        // Clean ups
        return () => observer.disconnect();
    }, []);

    // JSX
    return (
        <div className={styles.timeline}>
            <h1 className={styles.title}>Work Experience</h1>
            <div className={styles.timelineBody}>
                <div className={styles.line} />
                {WORK_EXPERIENCES.map((experience, idx) => (
                    <TimelineItem
                        key={idx}
                        idx={idx}
                        experience={experience}
                        visible={visibleItems.has(idx.toString())}
                    />
                ))}
            </div>
        </div>
    );
};

export default Timeline;
