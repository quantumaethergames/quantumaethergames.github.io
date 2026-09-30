// Edit this file to add, remove, or change open roles.
// Each role becomes a card on the home page.

export const CONTACT_EMAIL = 'quantumaethergames@gmail.com';

export type Role = {
    id: string;
    title: string;
    type: string;                                   // shown on the collapsed card
    location: string;                               // shown on the collapsed card
    summary: string;                                // 1-2 sentences on the collapsed card
    details: { label: string; value: string }[];    // quick facts (rate, duration, etc.)
    about: string;
    responsibilities: string[];
    responsibilityNote?: string;                    // optional line under responsibilities
    requirements: string[];
    howToApply: string;
    bonusQuestion?: string;
    applyBy?: string;                               // e.g. "October 20"
    emailBody?: string;                             // pre-filled email text
    links?: { label: string; url: string }[];
    pdf?: string;                                   // optional, file in /public
    draft?: boolean;                                // true = hidden on the site (use while writing a new role)
};

export const roles: Role[] = [
    {
        id: 'project-manager',
        title: 'Part-Time Indie Game Project Manager',
        type: 'Contract, part-time',
        location: 'Remote',
        summary:
            'Keep a small, distributed crew on track through production toward a mid-2027 PC beta: track deliverables and coordinate communication.',
        details: [
            { label: 'Rate', value: '$900–$1,200/month (US time zones preferred)' },
            { label: 'Duration', value: '6–7 months, November 2026 to April/May 2027' },
            { label: 'Time commitment', value: 'Up to 10–12 hrs/week, with a focus in January after supporting roles are hired' },
        ],
        about:
            'Omnivores Rule needs a Project Manager to help keep a small, distributed crew on track through the production phase and into a mid-2027 PC beta release. This is a focused, part-time support role centered on two things: tracking deliverables against the schedule, and coordinating communication between team members. The Creative Technologist remains hands-on and retains ownership of reporting, pitching, and playtest management. You keep things organized and moving rather than running production end-to-end.',
        responsibilities: [
            'Track deliverables against a drafted milestone schedule (Sept 2026 – May 2027) and flag risks or delays early. The schedule includes rough dates for demo builds, hiring timelines, and other internal deliverables.',
            'Coordinate day-to-day communication between team members (illustrators, technical artist, storyboard artist, composer, sound designer): scheduling check-ins, relaying updates, and keeping everyone aligned on due dates.',
            'Maintain lightweight documentation: task lists, timelines, and a deliverable tracker.',
            'Support the hiring process for 3 upcoming contract roles by helping with scheduling and logistics (not final decisions): ' +
            'Concept Artist/Illustrator (Nov 2026), ' +
            'Technical Artist/3D Artist (Jan 2027), ' +
            'Animator (Jan 2027),' +
            'Audio Designer and/or composer (March 2027)',
        ],
        requirements: [
            'Experience managing indie game or creative-media production, ideally with a small/distributed team.',
            'Comfortable with lightweight PM tools (Notion, Trello, Asana, or similar).',
            'Strong written communication; able to translate a production schedule into clear, trackable tasks.',
            'Plus: experience with grant-funded or fellowship-funded productions.',
            'Plus: genuine interest in narrative mystery/puzzle games, ecological storytelling, or decolonial design.',
        ],
        howToApply:
            'Send a resume, portfolio, and a short note on your experience coordinating creative or game production teams.',
        bonusQuestion:
            'Describe a moment in media (games, writing, etc.) that you think captures both beauty and brutality.',
        applyBy: 'October 20',
        emailBody:
            "Hi,\n\nI'm applying for the Project Manager role on Omnivores Rule.\n\nResume and portfolio: (attached / linked below)\n\nMy experience coordinating creative or game production teams:\n\nBonus question: a moment in media that captures both beauty and brutality:\n",
        links: [
            {
                label: 'Watch the game trailer',
                url: 'https://drive.google.com/file/d/1OStZ9yQwaOmy__9RMga6WMkP0DWgB1mi/view?usp=drive_link',
            },
            { label: 'Steam page', url: 'https://store.steampowered.com/app/3221630/Omnivores_Rule/' },
        ],
    },
    {
        id: 'concept-art-illustrator',
        title: 'Concept Art Illustrator',
        type: 'Contract, part-time',
        location: 'Remote',
        summary:
            'Help define the visual world of Omnivores Rule: concept art for 4-7 distinct areas + ecosystems, from creature design to landscape and atmosphere.',
        details: [
            { label: 'Rate', value: '$1,500–$2,000/month' },
            { label: 'Duration', value: '4–5 months, start Nov/Dec 2026, end March/April 2027' },
        ],
        about:
            "We're looking for a Concept Art Illustrator to help define the visual world of Omnivores Rule, a Moebius-inspired alien ecosystem rendered in a hand-drawn, procedurally-informed style. You'll shape the look of 10 distinct levels/environments, from creature design to landscape and atmosphere, working closely with the Creative Technologist to bring an interconnected, non-extractive alien biosphere to life.",
        responsibilities: [
            'Produce concept art renderings for all 10 levels/environments (first drafts for levels 1–10, second-pass revisions for levels 1–5).',
            "Help bring to life elements consistent with the game's ecological mechanics and existing design documents (flora, fauna, robotic, and/or other 'living' elements).",
            'Iterate based on feedback from the Creative Technologist, BPM Executive Producer, and advisers.',
            'Collaborate with the storyboard artist and technical artist to keep visual language consistent across mediums.',
            'Contribute visuals for promotional materials and the funders-only pitch deck as needed.',
        ],
        requirements: [
            'Strong portfolio in concept art/illustration, ideally with experience in games or animation.',
            'Experience illustrating non-traditional body structures (3 legs, 7 arms, 15 joints, gyroscopic torsos, etc.',
            'Comfortable working in a hand-drawn or painterly style (Moebius, Miyazaki (Ghibli), Green Street Pictures (Scavengers Reign, Common Side Effects), or similar sensibilities a plus).',
            'Interest in ecological, sci-fi, or Indigenous-futurist visual storytelling.',
            'Able to work independently against a production schedule and take direction well.',
        ],
        howToApply:
            'Send a resume, a portfolio (environment and creature design especially) and your availability from Nov 2026 through April 2027.',
        bonusQuestion:
            'Describe a moment in media (games, writing, etc.) that you think captures both beauty and brutality.',
        emailBody:
            "Hi,\n\nI'm applying for the Concept Art Illustrator role on Omnivores Rule.\n\nPortfolio (environment and creature design especially):\n\nMy availability from Nov/Dec 2026 through March/April 2027:\n\nA little about my experience:\n",
        links: [
            {
                label: 'Watch the game trailer',
                url: 'https://drive.google.com/file/d/1OStZ9yQwaOmy__9RMga6WMkP0DWgB1mi/view?usp=drive_link',
            },
            { label: 'Steam page', url: 'https://store.steampowered.com/app/3221630/Omnivores_Rule/' },
        ],
    },
];

// Shown under every role card when expanded.
export const PROJECT_BLURB =
    "Omnivores Rule is a third-person narrative mystery game built in Unreal Engine 5, following a flying android sent to \"terraform\" an alien planet who learns to listen to its living, interconnected ecosystems and solve the mystery of its creation. Gameplay focuses on sonic communication, a nonlinear narrative, and a Moebius-inspired hand-drawn aesthetic, grounded in relational gameplay systems. It's in production toward a mid-late 2027 beta demo launch, supported by BPMplus/Black Public Media R&D funding and other grants. Roles are contract/freelance positions on a small, mission-driven indie team led by Creative Technologist Connor Wall. Rates and durations reflect the current production budget; exact start rates and dates are flexible within the ranges noted.";