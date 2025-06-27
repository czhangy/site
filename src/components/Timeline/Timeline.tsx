// components/Timeline.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Timeline.module.scss';

interface WorkExperience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    achievements: string[];
    logo?: string;
}

const workExperiences: WorkExperience[] = [
    {
        id: '1',
        company: 'Tech Innovations Inc.',
        position: 'Senior Full Stack Developer',
        startDate: '2022-03',
        endDate: 'Present',
        description:
            'Leading development of scalable web applications using modern technologies. Mentoring junior developers and architecting cloud-based solutions.',
        achievements: [
            'Reduced application load time by 40%',
            'Led team of 5 developers',
            'Implemented CI/CD pipeline',
        ],
    },
    {
        id: '2',
        company: 'StartupXYZ',
        position: 'Frontend Developer',
        startDate: '2020-06',
        endDate: '2022-02',
        description:
            'Built responsive user interfaces and improved user experience across multiple products. Collaborated closely with design and backend teams.',
        achievements: [
            'Increased user engagement by 60%',
            'Developed component library',
            'Optimized mobile performance',
        ],
    },
    {
        id: '3',
        company: 'Digital Solutions Corp',
        position: 'Junior Web Developer',
        startDate: '2019-01',
        endDate: '2020-05',
        description:
            'Developed and maintained client websites using various technologies. Gained experience in full-stack development and project management.',
        achievements: [
            'Delivered 15+ client projects',
            'Improved website accessibility',
            'Reduced bug reports by 30%',
        ],
    },
    {
        id: '4',
        company: 'Freelance',
        position: 'Web Developer',
        startDate: '2018-03',
        endDate: '2018-12',
        description:
            'Provided web development services to small businesses and startups. Built custom websites and e-commerce solutions.',
        achievements: [
            'Built 10+ websites',
            'Achieved 95% client satisfaction',
            'Generated $50K+ revenue',
        ],
    },
];

const Timeline: React.FC = () => {
    // Hooks
    const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
    const timelineRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
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

        return () => observer.disconnect();
    }, []);

    // Helpers
    const formatDate = (dateString: string): string => {
        if (dateString === 'Present') return 'Present';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
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
        <div className={styles.timeline}>
            <h1 className={styles.title}>Work Experience</h1>
            <div className={styles.timelineBody} ref={timelineRef}>
                <div className={styles.line} />
                {workExperiences.map(experience => (
                    <div
                        key={experience.id}
                        data-id={experience.id}
                        className={styles.timelineItem}
                    >
                        <div className={styles.timelineMarker}>
                            <div className={styles.markerDot} />
                        </div>
                        <div
                            className={`${styles.timelineContent}  ${
                                visibleItems.has(experience.id) ? styles.visible : ''
                            }`}
                        >
                            <div className={styles.contentHeader}>
                                <div className={styles.dateRange}>
                                    <span className={styles.startDate}>
                                        {formatDate(experience.startDate)}
                                    </span>
                                    <span className={styles.dateSeparator}>—</span>
                                    <span className={styles.endDate}>
                                        {formatDate(experience.endDate)}
                                    </span>
                                    <span className={styles.duration}>
                                        (
                                        {calculateDuration(
                                            experience.startDate,
                                            experience.endDate
                                        )}
                                        )
                                    </span>
                                </div>
                                <h3 className={styles.position}>{experience.position}</h3>
                                <h4 className={styles.company}>{experience.company}</h4>
                            </div>
                            <div className={styles.achievements}>
                                <ul className={styles.achievementsList}>
                                    {experience.achievements.map((achievement, achIndex) => (
                                        <li key={achIndex} className={styles.achievement}>
                                            {achievement}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;
