import { WorkExperience } from '@/utils/interfaces';
import Image from 'next/image';
import React from 'react';
import styles from './TimelineItem.module.scss';

interface TimelineItemProps {
    experience: WorkExperience;
    idx: number;
    visible: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = props => {
    // Helpers
    const formatDate = (dateString: string): string => {
        if (dateString === 'Present') return 'Present';
        const wrongDate = new Date(dateString);
        const actualDate = new Date(wrongDate.getFullYear(), wrongDate.getMonth() + 1);
        return actualDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
        });
    };

    const calculateDuration = (start: string, end: string): string => {
        const startDate = new Date(start);
        const endDate = end === 'Present' ? new Date() : new Date(end);
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));

        if (diffMonths < 12) {
            return `${diffMonths} month${diffMonths !== 1 ? 's' : ''}`;
        }

        const years = Math.floor(diffMonths / 12);
        const months = diffMonths % 12;

        let duration = `${years} year${years !== 1 ? 's' : ''}`;
        if (months > 0) {
            duration += ` ${months} month${months !== 1 ? 's' : ''}`;
        }

        return duration;
    };

    // JSX
    return (
        <div data-id={props.idx} className={styles.timelineItem}>
            <div className={styles.timelineMarker}>
                <div className={styles.markerDot} />
            </div>
            <div className={`${styles.timelineContent}  ${props.visible ? styles.visible : ''}`}>
                <div className={styles.contentHeader}>
                    <div className={styles.dateRange}>
                        <span className={styles.startDate}>
                            {formatDate(props.experience.startDate)}
                        </span>
                        <span className={styles.dateSeparator}>—</span>
                        <span className={styles.endDate}>
                            {formatDate(props.experience.endDate)}
                        </span>
                        <span className={styles.duration}>
                            (
                            {calculateDuration(
                                props.experience.startDate,
                                props.experience.endDate
                            )}
                            )
                        </span>
                    </div>
                    <div className={styles.companyInfo}>
                        <div className={styles.logo}>
                            <Image
                                className="next-image"
                                src={props.experience.logo}
                                alt={`${props.experience.company} logo`}
                                fill
                            />
                        </div>
                        <div className={styles.companyText}>
                            <h3 className={styles.company}>{props.experience.company}</h3>
                            <h4 className={styles.position}>{props.experience.position}</h4>
                        </div>
                    </div>
                </div>
                <div className={styles.achievements}>
                    <ul className={styles.achievementsList}>
                        {props.experience.achievements.map((achievement, idx) => (
                            <li key={idx} className={styles.achievement}>
                                {achievement}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TimelineItem;
