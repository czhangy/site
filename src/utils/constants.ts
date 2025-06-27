import { LinkItem, WorkExperience } from '@/utils/interfaces';

export const LINK_ITEMS: LinkItem[] = [
    { display: 'Home', href: '/', width: 2.8 },
    { display: 'Projects', href: '/projects', width: 3.5 },
    { display: 'Journals', href: '/journals', width: 3.6 },
    { display: 'Work', href: '/work', width: 2.3 },
];

export const WORK_EXPERIENCES: WorkExperience[] = [
    {
        company: 'Stripe',
        position: 'Software Engineer',
        startDate: '2023-12',
        endDate: 'Present',
        achievements: [],
    },
    {
        company: 'Capital One',
        position: 'Software Engineering Intern',
        startDate: '2022-06',
        endDate: '2022-08',
        achievements: [
            'Developed a note-taking service, cross-window communication, and UI elements using Angular for an internal loan processing platform used by ~1,000 agents across multiple divisions, working with a QA team to release into production.',
            'Used WASM and LitElement to develop, optimize, and test a document viewer micro-frontend that outperforms previous builds and the PDF.js library by ~30%, while incorporating new functionality such as grab and drag and image rendering.',
            'Researched WASM, shared web workers, and internal APIs to drive innovation on newer products.',
        ],
    },
    {
        company: 'Bruinshack',
        position: 'Front-End Lead',
        startDate: '2021-11',
        endDate: '2022-06',
        achievements: [
            'Led a redesign of multiple static pages and the apartment manager portal in an effort to improve brand visibility and quality-of-life for the userbase.',
            "Spearheaded the design and development of a user dashboard and dorm review feature in an effort to improve students' experience on the site, contributing to an increase of ~40% user acquisition.",
            'Led a refactoring effort from Vue.js to Next.js to improve SEO and codebase clarity for future hires, and implemented/enforced new code standards using Prettier, reducing codebase size by over 30%.',
        ],
    },
    {
        company: 'Bruinshack',
        position: 'Full-Stack Developer',
        startDate: '2021-02',
        endDate: '2021-11',
        achievements: [
            'Designed and developed a responsive review system using Vue.js and the Vuex library that facilitates ratings and reviews from approximately 2,000 weekly active users looking for apartments in the Westwood area.',
            'Worked with design team to establish communication channels to improve inter-team efficiency and reduce unnecessary development.',
        ],
    },
    {
        company: 'The Amplification Project',
        position: 'Front-End Developer',
        startDate: '2021-05',
        endDate: '2021-09',
        achievements: [
            "Worked to implement a responsive design of the organization's main website using Vue.js while coordinating with a backend developer to raise awareness of forced migration through the preservation of related art and activism.",
        ],
    },
];
