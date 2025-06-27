// components/Timeline.tsx
'use client';

import { WorkExperience } from '@/utils/interfaces';
import { useEffect, useRef, useState } from 'react';
import TimelineItem from '../TimelineItem/TimelineItem';
import styles from './Timeline.module.scss';

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

    // JSX
    return (
        <div className={styles.timeline}>
            <h1 className={styles.title}>Work Experience</h1>
            <div className={styles.timelineBody} ref={timelineRef}>
                <div className={styles.line} />
                {workExperiences.map(experience => (
                    <TimelineItem
                        key={experience.id}
                        experience={experience}
                        visible={visibleItems.has(experience.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Timeline;
