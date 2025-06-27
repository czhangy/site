import { LinkItem, WorkExperience } from '@/utils/interfaces';

export const LINK_ITEMS: LinkItem[] = [
    { display: 'Home', href: '/', width: 2.8 },
    { display: 'Projects', href: '/projects', width: 3.5 },
    { display: 'Journals', href: '/journals', width: 3.6 },
    { display: 'Work', href: '/work', width: 2.3 },
];

export const WORK_EXPERIENCES: WorkExperience[] = [
    {
        company: 'Tech Innovations Inc.',
        position: 'Senior Full Stack Developer',
        startDate: '2022-03',
        endDate: 'Present',
        achievements: [
            'Reduced application load time by 40%',
            'Led team of 5 developers',
            'Implemented CI/CD pipeline',
        ],
    },
    {
        company: 'StartupXYZ',
        position: 'Frontend Developer',
        startDate: '2020-06',
        endDate: '2022-02',
        achievements: [
            'Increased user engagement by 60%',
            'Developed component library',
            'Optimized mobile performance',
        ],
    },
    {
        company: 'Digital Solutions Corp',
        position: 'Junior Web Developer',
        startDate: '2019-01',
        endDate: '2020-05',
        achievements: [
            'Delivered 15+ client projects',
            'Improved website accessibility',
            'Reduced bug reports by 30%',
        ],
    },
    {
        company: 'Freelance',
        position: 'Web Developer',
        startDate: '2018-03',
        endDate: '2018-12',
        achievements: [
            'Built 10+ websites',
            'Achieved 95% client satisfaction',
            'Generated $50K+ revenue',
        ],
    },
];
