import React, { useState, useEffect, useRef } from 'react';

// Mock Data (moved from original HTML script)
const recommendations = [
    {
        id: 'course1',
        type: 'Course',
        title: 'Data Structures & Algorithms in Python',
        description: 'Master fundamental data structures and algorithms using Python, crucial for technical interviews.',
        icon: 'fas fa-code',
        color: 'blue',
        thumbnail: 'https://images.pexels.com/videos/7841973/programming-7841973.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    {
        id: 'article2',
        type: 'Article',
        title: 'The Future of AI in Education',
        description: 'Explore how AI is transforming learning experiences globally, from personalized tutors to content generation.',
        icon: 'fas fa-newspaper',
        color: 'purple',
        thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 'video3',
        type: 'Video',
        title: 'Understanding Neural Networks Visually',
        description: 'An animated guide to the core concepts of deep learning, explaining complex ideas simply.',
        icon: 'fas fa-video',
        color: 'red',
        thumbnail: 'https://images.pexels.com/videos/8540702/pexels-video-8540702.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    {
        id: 'quiz4',
        type: 'Quiz',
        title: 'Quiz: Fundamental Algorithms',
        description: 'Test your knowledge on sorting, searching, and graph algorithms with this interactive quiz.',
        icon: 'fas fa-brain',
        color: 'green',
        thumbnail: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 'book5',
        type: 'Book',
        title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        description: 'Learn to write clean, maintainable, and efficient code that stands the test of time.',
        icon: 'fas fa-book',
        color: 'yellow',
        thumbnail: 'https://images.pexels.com/photos/106368/pexels-photo-106368.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 'podcast6',
        type: 'Podcast',
        title: 'AI in 5 Minutes: Ethical AI',
        description: 'Quick takes on the moral implications and societal impact of artificial intelligence.',
        icon: 'fas fa-microphone-alt',
        color: 'indigo',
        thumbnail: 'https://images.pexels.com/photos/5926390/pexels-photo-5926390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 'course7',
        type: 'Course',
        title: 'Introduction to Quantum Computing',
        description: 'An accessible introduction to the mind-bending world of quantum mechanics and computing.',
        icon: 'fas fa-atom',
        color: 'teal',
        thumbnail: 'https://images.pexels.com/photos/8386438/pexels-photo-8386438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 'video8',
        type: 'Video',
        title: 'Deep Dive into React Hooks',
        description: 'Master custom hooks, context API, and advanced state management in React.',
        icon: 'fab fa-react',
        color: 'cyan',
        thumbnail: 'https://images.pexels.com/videos/8540608/pexels-video-8540608.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    }
];

const courses = [
    {
        id: 'web-dev-bootcamp',
        title: 'Web Development Bootcamp',
        description: 'A comprehensive bootcamp covering HTML, CSS, JavaScript, React, Node.js, and databases. Build modern web applications from scratch.',
        progress: 60,
        thumbnail: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        modules: [
            { id: 'html-css', title: 'Module 1: HTML & CSS Essentials', completed: true, videoUrl: 'https://www.pexels.com/videos/man-typing-on-a-laptop-4537130/download/?search_query=coding&tracking_id=4537130&auto_play=1' },
            { id: 'js-basics', title: 'Module 2: JavaScript Fundamentals', completed: true, videoUrl: 'https://www.pexels.com/videos/person-typing-on-a-laptop-4537130/download/?search_query=coding&tracking_id=4537130&auto_play=1' },
            { id: 'react-intro', title: 'Module 3: Introduction to React', completed: false, videoUrl: 'https://www.pexels.com/videos/code-on-a-computer-screen-4537130/download/?search_query=coding&tracking_id=4537130&auto_play=1' },
            { id: 'node-express', title: 'Module 4: Node.js & Express', completed: false, videoUrl: 'https://www.pexels.com/videos/coding-on-a-computer-screen-4537130/download/?search_query=coding&tracking_id=4537130&auto_play=1' },
            { id: 'databases', title: 'Module 5: Databases with MongoDB', completed: false, videoUrl: 'https://www.pexels.com/videos/typing-on-a-keyboard-4537130/download/?search_query=coding&tracking_id=4537130&auto_play=1' }
        ]
    },
    {
        id: 'data-science-python',
        title: 'Data Science with Python',
        description: 'Learn data manipulation, analysis, visualization, and machine learning using Python libraries like Pandas, NumPy, and Scikit-learn.',
        progress: 85,
        thumbnail: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        modules: [
            { id: 'python-for-ds', title: 'Module 1: Python for Data Science', completed: true, videoUrl: 'https://www.pexels.com/videos/a-person-typing-on-a-keyboard-4537130/download/?search_query=coding&tracking_id=4537130&auto_play=1' },
            { id: 'pandas-numpy', title: 'Module 2: Pandas & NumPy', completed: true, videoUrl: 'https://www.pexels.com/videos/coding-on-a-computer-screen-4537130/download/?search_query=coding&tracking_id=4537130&auto_play=1' },
            { id: 'data-viz', title: 'Module 3: Data Visualization', completed: true, videoUrl: 'https://www.pexels.com/videos/man-typing-on-a-laptop-4537130/download/?search_query=coding&tracking_id=4537130&auto_play=1' },
            { id: 'ml-basics', title: 'Module 4: Machine Learning Basics', completed: false, videoUrl: 'https://www.pexels.com/videos/person-typing-on-a-laptop-4537130/download/?search_query=coding&tracking_id=4537130&auto_play=1' }
        ]
    },
    {
        id: 'ml-fundamentals',
        title: 'Machine Learning Fundamentals',
        description: 'An introduction to the core concepts of machine learning, including supervised and unsupervised learning algorithms.',
        progress: 40,
        thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        modules: [
            { id: 'intro-ml', title: 'Module 1: What is ML?', completed: true, videoUrl: 'https://www.pexels.com/videos/code-on-a-computer-screen-4537130/download/?search_query=coding&tracking_id=4537130&auto_play=1' },
            { id: 'linear-regression', title: 'Module 2: Linear Regression', completed: false, videoUrl: 'https://www.pexels.com/videos/coding-on-a-computer-screen-4537130/download/?search_query=coding&tracking_id=4537130&auto_play=1' },
            { id: 'logistic-regression', title: 'Module 3: Logistic Regression', completed: false, videoUrl: 'https://www.pexels.com/videos/typing-on-a-keyboard-4537130/download/?search_query=coding&tracking_id=4537130&auto_play=1' }
        ]
    },
    {
        id: 'cloud-computing',
        title: 'Cloud Computing Essentials',
        description: 'Understand the basics of cloud computing, different service models (IaaS, PaaS, SaaS), and major cloud providers.',
        progress: 20,
        thumbnail: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        modules: [
            { id: 'what-is-cloud', title: 'Module 1: Introduction to Cloud', completed: true, videoUrl: 'https://www.pexels.com/videos/abstract-light-movement-8540702/download/?search_query=cloud&tracking_id=8540702&auto_play=1' },
            { id: 'iaas-paas-saas', title: 'Module 2: Service Models', completed: false, videoUrl: 'https://www.pexels.com/videos/abstract-light-movement-8540702/download/?search_query=cloud&tracking_id=8540702&auto_play=1' }
        ]
    },
    {
        id: 'cybersecurity-basics',
        title: 'Cybersecurity Basics',
        description: 'Learn fundamental cybersecurity concepts, common threats, and best practices to protect yourself and your data online.',
        progress: 75,
        thumbnail: 'https://images.pexels.com/photos/3220594/pexels-photo-3220594.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        modules: [
            { id: 'intro-cyber', title: 'Module 1: Cyber Threats Overview', completed: true, videoUrl: 'https://www.pexels.com/videos/a-person-typing-on-a-keyboard-4537130/download/?search_query=cybersecurity&tracking_id=4537130&auto_play=1' },
            { id: 'password-security', title: 'Module 2: Password Management', completed: true, videoUrl: 'https://www.pexels.com/videos/coding-on-a-computer-screen-4537130/download/?search_query=cybersecurity&tracking_id=4537130&auto_play=1' },
            { id: 'network-security', title: 'Module 3: Network Security', completed: false, videoUrl: 'https://www.pexels.com/videos/man-typing-on-a-laptop-4537130/download/?search_query=cybersecurity&tracking_id=4537130&auto_play=1' }
        ]
    },
    {
        id: 'generative-ai',
        title: 'Generative AI Fundamentals',
        description: 'Explore the exciting world of generative AI, including models like GANs and Transformers, and their applications.',
        progress: 10,
        thumbnail: 'https://images.pexels.com/photos/7413914/pexels-photo-7413914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        modules: [
            { id: 'intro-gen-ai', title: 'Module 1: What is Generative AI?', completed: true, videoUrl: 'https://www.pexels.com/videos/abstract-light-movement-8540702/download/?search_query=ai&tracking_id=8540702&auto_play=1' },
            { id: 'gans-basics', title: 'Module 2: Generative Adversarial Networks (GANs)', completed: false, videoUrl: 'https://www.pexels.com/videos/abstract-light-movement-8540702/download/?search_query=ai&tracking_id=8540702&auto_play=1' }
        ]
    },
    {
        id: 'mobile-dev-flutter',
        title: 'Mobile Development with Flutter',
        description: 'Build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase using Flutter and Dart.',
        progress: 0,
        thumbnail: 'https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        modules: [
            { id: 'flutter-intro', title: 'Module 1: Introduction to Flutter', completed: false, videoUrl: 'https://www.pexels.com/videos/a-person-typing-on-a-keyboard-4537130/download/?search_query=mobile+development&tracking_id=4537130&auto_play=1' },
            { id: 'widgets-layouts', title: 'Module 2: Widgets and Layouts', completed: false, videoUrl: 'https://www.pexels.com/videos/coding-on-a-computer-screen-4537130/download/?search_query=mobile+development&tracking_id=4537130&auto_play=1' }
        ]
    },
    {
        id: 'ux-ui-design',
        title: 'UX/UI Design Principles',
        description: 'Learn the fundamentals of user experience (UX) and user interface (UI) design to create intuitive and engaging digital products.',
        progress: 30,
        thumbnail: 'https://images.pexels.com/photos/3862370/pexels-photo-3862370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        modules: [
            { id: 'intro-ux-ui', title: 'Module 1: Understanding UX/UI', completed: true, videoUrl: 'https://www.pexels.com/videos/man-typing-on-a-laptop-4537130/download/?search_query=design&tracking_id=4537130&auto_play=1' },
            { id: 'user-research', title: 'Module 2: User Research Methods', completed: false, videoUrl: 'https://www.pexels.com/videos/person-typing-on-a-laptop-4537130/download/?search_query=design&tracking_id=4537130&auto_play=1' }
        ]
    }
];

const aiFocusMessages = [
    `Your AI tutor suggests reviewing **Data Structures Module 3** and spending 30 minutes on **JavaScript algorithms**. You're close to mastering Lists!`,
    `Based on your recent activity, focus on **Cloud Computing Fundamentals** for the next 45 minutes. Pay attention to serverless architectures.`,
    `It seems you're struggling with **Advanced Calculus concepts**. Your AI tutor recommends re-watching Lecture 7 and trying Practice Set B.`,
    `Great progress on **Machine Learning!** Today, the AI suggests exploring **Reinforcement Learning basics** for 25 minutes.`,
    `Your upcoming deadline for **Project Alpha** is critical. The AI recommends dedicating the next 2 hours to completing the remaining tasks.`,
    `Time for a quick review! Your AI tutor suggests a 15-minute quiz on **CSS Flexbox and Grid** to solidify your frontend skills.`
];

const App = () => {
    // State variables
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Initialize dark mode from localStorage or default to false
        return localStorage.getItem('theme') === 'dark';
    });
    const [activeSection, setActiveSection] = useState('dashboard-content');
    const [isChatModalOpen, setIsChatModalOpen] = useState(false);
    const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [currentAIFocus, setCurrentAIFocus] = useState('');
    const [currentRecommendations, setCurrentRecommendations] = useState([]);
    const [chatMessages, setChatMessages] = useState([
        { sender: 'AI Tutor', text: 'Hello Jane! How can I assist you with your learning today?' }
    ]);
    const [chatInput, setChatInput] = useState('');
    const [chatLoading, setChatLoading] = useState(false);

    // Refs for DOM elements for focus management and scrolling
    const mainContentAreaRef = useRef(null);
    const chatHistoryRef = useRef(null);
    const notificationButtonRef = useRef(null);
    const chatAiButtonRef = useRef(null);
    const profileAreaRef = useRef(null);
    const profileDropdownRef = useRef(null);

    // Custom CSS from the original HTML, adapted to replace some Tailwind classes
    const customStyles = `
        /* General Body and Layout */
        body {
            min-height: 100vh;
            background-color: #f9fafb; /* bg-gray-50 */
            color: #1f2937; /* text-gray-900 */
            font-family: sans-serif; /* font-sans */
            display: flex;
            flex-direction: column;
        }

        /* Custom scrollbar for better aesthetics, especially in dark mode */
        .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #555;
        }

        /* Dark mode scrollbar */
        body.dark .custom-scrollbar::-webkit-scrollbar-track {
            background: #1a1a1a; /* Darker track for OG black */
        }
        body.dark .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #444; /* Darker thumb for OG black */
        }
        body.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #666; /* Darker thumb hover for OG black */
        }

        /* Ensure smooth transitions for sidebar */
        .sidebar-panel {
            transition: width 0.3s ease-in-out, padding 0.3s ease-in-out;
            overflow: hidden;
            background-color: #ffffff; /* bg-white */
            border-right: 1px solid #e5e7eb; /* border-gray-200 */
            padding: 1rem; /* p-4 */
            flex-shrink: 0;
            width: 256px; /* w-64 */
            overflow-y: auto;
        }
        @media (min-width: 768px) { /* md:w-60 */
            .sidebar-panel {
                width: 240px;
            }
        }

        /* Sidebar collapsed state */
        .sidebar-panel.collapsed {
            width: 80px;
            padding-left: 1rem;
            padding-right: 1rem;
        }
        .sidebar-panel.collapsed .sidebar-link span {
            display: none;
        }
        .sidebar-panel.collapsed .sidebar-link {
            justify-content: center;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
        }
        .sidebar-panel.collapsed .sidebar-link i {
            margin-right: 0 !important;
        }
        .sidebar-panel.collapsed .sidebar-promo {
            display: none;
        }
        .sidebar-panel.collapsed hr {
            display: none;
        }
        .sidebar-panel.collapsed h3 {
            display: none;
        }

        /* Header Styles */
        .app-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem;
            background-color: #ffffff;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
            position: sticky;
            top: 0;
            z-index: 20;
            border-bottom-left-radius: 0.5rem; /* rounded-b-lg */
            border-bottom-right-radius: 0.5rem; /* rounded-b-lg */
        }
        .app-header .search-input {
            flex: 1;
            max-width: 32rem; /* max-w-lg */
            margin-left: 1rem;
            margin-right: 1rem;
            padding: 0.5rem;
            border: 1px solid #d1d5db; /* border-gray-300 */
            border-radius: 9999px; /* rounded-full */
            outline: none;
            box-shadow: 0 0 0 0 rgba(0,0,0,0); /* focus:ring-2 focus:ring-blue-500 */
        }
        .app-header .search-input:focus {
            box-shadow: 0 0 0 2px #3b82f6; /* focus:ring-2 focus:ring-blue-500 */
        }
        .app-header .header-buttons {
            display: flex;
            align-items: center;
            gap: 1rem; /* space-x-4 */
            position: relative;
        }
        .app-header .header-button {
            padding: 0.5rem;
            border-radius: 9999px; /* rounded-full */
            background-color: transparent;
            border: none;
            cursor: pointer;
            outline: none;
        }
        .app-header .header-button:hover {
            background-color: #e5e7eb; /* hover:bg-gray-200 */
        }
        .app-header .header-button:focus {
            box-shadow: 0 0 0 2px #93c5fd; /* focus:ring-2 focus:ring-blue-300 */
        }
        .app-header .profile-area {
            display: flex;
            align-items: center;
            gap: 0.5rem; /* space-x-2 */
            cursor: pointer;
            position: relative;
        }
        .app-header .profile-avatar {
            width: 36px;
            height: 36px;
            border-radius: 9999px; /* rounded-full */
            object-fit: cover;
            border: 2px solid #60a5fa; /* border-blue-400 */
        }
        .app-header .profile-name {
            font-weight: 500; /* font-medium */
            color: #1f2937; /* text-gray-800 */
        }
        @media (max-width: 640px) { /* hidden sm:block */
            .app-header .profile-name {
                display: none;
            }
        }
        @media (max-width: 768px) { /* hidden md:flex */
            .app-header .search-input-wrapper {
                display: none;
            }
        }

        /* Main Content Area */
        .main-content-area {
            flex: 1;
            padding: 1.5rem; /* p-6 */
            overflow-y: auto;
        }

        /* Content Sections */
        .content-section {
            padding-bottom: 2rem; /* Added for consistent spacing */
        }

        /* Card Styles (general) */
        .card {
            background-color: #ffffff;
            padding: 1.5rem;
            border-radius: 0.5rem; /* rounded-lg */
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
        }
        .card-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
        @media (min-width: 640px) { /* sm:grid-cols-2 */
            .card-grid.sm-cols-2 {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        @media (min-width: 1024px) { /* lg:grid-cols-3 */
            .card-grid.lg-cols-3 {
                grid-template-columns: repeat(3, 1fr);
            }
        }
        @media (min-width: 1280px) { /* xl:grid-cols-4 */
            .card-grid.xl-cols-4 {
                grid-template-columns: repeat(4, 1fr);
            }
        }

        /* Specific Card Styles */
        .ai-focus-card {
            border: 2px solid #bfdbfe; /* border-blue-200 */
        }
        .ai-focus-card .refresh-button {
            padding: 0.5rem 1rem;
            background-color: #3b82f6; /* bg-blue-500 */
            color: #ffffff;
            border-radius: 0.375rem; /* rounded-md */
            transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
            transition-duration: 200ms; /* duration-200 */
        }
        .ai-focus-card .refresh-button:hover {
            background-color: #2563eb; /* hover:bg-blue-600 */
        }

        /* Progress Bar */
        .progress-bar-container {
            width: 100%;
            background-color: #e5e7eb; /* bg-gray-200 */
            border-radius: 9999px; /* rounded-full */
            height: 0.625rem; /* h-2.5 */
        }
        .progress-bar-fill {
            background-color: #3b82f6; /* bg-blue-500 */
            height: 100%;
            border-radius: 9999px;
        }
        .progress-text {
            font-size: 0.875rem; /* text-sm */
            color: #4b5563; /* text-gray-600 */
            margin-top: 0.5rem;
        }

        /* List Styles */
        .deadline-list li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.875rem;
        }
        .deadline-list .icon {
            margin-right: 0.5rem;
            color: #3b82f6; /* text-blue-500 */
        }
        .deadline-list .status-text {
            font-weight: 500;
        }
        .deadline-list .status-red { color: #ef4444; } /* text-red-500 */
        .deadline-list .status-yellow { color: #f59e0b; } /* text-yellow-500 */

        /* Recommendation Card Specifics */
        .recommendation-card {
            border-top-width: 4px;
            border-top-style: solid;
        }
        .recommendation-card .type-icon {
            font-size: 1.5rem; /* text-2xl */
            margin-right: 0.75rem;
        }
        .recommendation-card .type-label {
            font-size: 0.875rem;
            font-weight: 600;
            text-transform: uppercase;
            color: #4b5563;
        }
        .recommendation-card .learn-more-button {
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            background-color: #3b82f6;
            color: #ffffff;
            font-size: 0.875rem;
            border-radius: 0.375rem;
            transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
            transition-duration: 200ms;
        }
        .recommendation-card .learn-more-button:hover {
            background-color: #2563eb;
        }

        /* Course Card Specifics */
        .course-card {
            cursor: pointer;
        }
        .course-card .continue-button {
            padding: 0.5rem 1rem;
            background-color: #3b82f6;
            color: #ffffff;
            font-size: 0.875rem;
            border-radius: 0.375rem;
            transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
            transition-duration: 200ms;
        }
        .course-card .continue-button:hover {
            background-color: #2563eb;
        }

        /* Course Detail Specifics */
        .back-button {
            margin-bottom: 1rem;
            padding: 0.5rem 1rem;
            background-color: #e5e7eb;
            color: #1f2937;
            border-radius: 0.375rem;
        }
        .back-button:hover {
            background-color: #d1d5db;
        }
        .course-module-item {
            background-color: #f9fafb; /* bg-gray-50 */
            padding: 1rem;
            border-radius: 0.5rem;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .course-module-item .watch-video-button {
            padding: 0.25rem 0.75rem;
            background-color: #3b82f6;
            color: #ffffff;
            font-size: 0.875rem;
            border-radius: 0.375rem;
            display: flex;
            align-items: center;
        }
        .course-module-item .watch-video-button:hover {
            background-color: #2563eb;
        }

        /* General Button Styles */
        .btn-primary {
            padding: 0.75rem 1.5rem; /* px-6 py-3 */
            background-color: #3b82f6; /* bg-blue-500 */
            color: #ffffff;
            border-radius: 0.5rem; /* rounded-lg */
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
            transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
            transition-duration: 200ms;
        }
        .btn-primary:hover {
            background-color: #2563eb; /* hover:bg-blue-600 */
        }
        .btn-secondary {
            padding: 0.5rem 1rem; /* px-4 py-2 */
            background-color: #e5e7eb; /* bg-gray-200 */
            color: #1f2937; /* text-gray-800 */
            border-radius: 0.375rem; /* rounded-md */
        }
        .btn-secondary:hover {
            background-color: #d1d5db; /* hover:bg-gray-300 */
        }

        /* Input and Select Styles */
        input[type="text"],
        input[type="email"],
        input[type="password"],
        select {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #d1d5db;
            border-radius: 0.375rem;
            background-color: #ffffff;
            color: #1f2937;
        }

        /* Checkbox Styles */
        .form-checkbox {
            height: 1.25rem; /* h-5 */
            width: 1.25rem; /* w-5 */
            color: #3b82f6; /* text-blue-600 */
            border-radius: 0.25rem; /* rounded */
        }

        /* AI-inspired dynamic emphasis */
        .ai-emphasized {
            animation: pulse-emphasis 1.5s infinite alternate;
        }

        @keyframes pulse-emphasis {
            0% { box-shadow: 0 0 0px rgba(0, 0, 0, 0); }
            100% { box-shadow: 0 0 15px rgba(100, 100, 255, 0.4); }
        }

        /* Dark mode specific overrides for a true "OG Black" feel */
        body.dark {
            background-color: #0a0a0a;
            color: #e0e0e0;
        }
        body.dark .app-header,
        body.dark .sidebar-panel,
        body.dark .card,
        body.dark .modal-content,
        body.dark .dropdown-menu {
            background-color: #1c1c1c;
        }
        body.dark .app-header,
        body.dark .card {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.24);
        }
        body.dark .sidebar-panel {
            border-color: #333;
        }
        body.dark .header-button:hover,
        body.dark .sidebar-link:hover,
        body.dark .dropdown-menu li a:hover,
        body.dark .btn-secondary:hover {
            background-color: #282828;
        }
        body.dark .profile-name,
        body.dark .text-gray-800 {
            color: #e0e0e0;
        }
        body.dark .text-gray-700,
        body.dark .text-gray-600 {
            color: #c0c0c0;
        }
        body.dark .text-gray-300 {
            color: #b0b0b0;
        }
        body.dark .text-blue-600 {
            color: #6366f1;
        }
        body.dark .text-blue-400 {
            color: #818cf8;
        }
        body.dark .ai-focus-card {
            border-color: #4f46e5; /* dark:border-blue-700 */
        }
        body.dark .ai-focus-card .refresh-button,
        body.dark .btn-primary,
        body.dark .course-card .continue-button,
        body.dark .recommendation-card .learn-more-button,
        body.dark .course-module-item .watch-video-button {
            background-color: #6366f1;
        }
        body.dark .ai-focus-card .refresh-button:hover,
        body.dark .btn-primary:hover,
        body.dark .course-card .continue-button:hover,
        body.dark .recommendation-card .learn-more-button:hover,
        body.dark .course-module-item .watch-video-button:hover {
            background-color: #4f46e5;
        }
        body.dark .progress-bar-container,
        body.dark .text-gray-200 {
            background-color: #333;
        }
        body.dark input,
        body.dark select {
            background-color: #282828;
            border-color: #444;
            color: #e0e0e0;
        }
        body.dark .bg-gradient-to-r.from-blue-100.to-purple-100 {
            background-image: linear-gradient(to right, #282828, #3a2848);
        }
        body.dark .text-green-600 { color: #4CAF50; }
        body.dark .text-yellow-500 { color: #FFC107; }
        body.dark .text-red-500 { color: #F44336; }
        body.dark .text-purple-500 { color: #9C27B0; }
        body.dark .text-indigo-500 { color: #673AB7; }
        body.dark .text-teal-500 { color: #009688; }
        body.dark .text-cyan-500 { color: #00BCD4; }

        /* Modal specific styles */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .modal-content {
            background-color: white;
            padding: 24px;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
            width: 90%;
            max-width: 550px;
            position: relative;
            animation: fadeIn 0.3s ease-out;
        }
        body.dark .modal-content {
            background-color: #1e1e1e;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Dropdown specific styles */
        .dropdown-menu {
            position: absolute;
            top: 100%;
            right: 0;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            min-width: 180px;
            z-index: 999;
            animation: fadeInScale 0.2s ease-out;
        }
        body.dark .dropdown-menu {
            background-color: #1e1e1e;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }
        @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }

        /* Sidebar Link base styles */
        .sidebar-link {
            display: flex;
            align-items: center;
            padding: 0.75rem; /* p-3 */
            border-radius: 0.5rem; /* rounded-lg */
            transition: background-color 0.2s ease-in-out;
            color: #4b5563; /* text-gray-700 */
            text-decoration: none;
            font-weight: 400;
        }
        .sidebar-link:hover {
            background-color: #f3f4f6; /* hover:bg-gray-100 */
        }
        .sidebar-link i {
            margin-right: 1rem; /* mr-4 */
            font-size: 1.25rem; /* text-xl */
        }

        /* Active Sidebar Link styles */
        .sidebar-link.active {
            font-weight: 500; /* font-medium */
            color: #3b82f6; /* text-blue-600 */
        }
        body.dark .sidebar-link.active {
            color: #818cf8; /* dark:text-blue-400 */
        }

        /* Utility for text colors */
        .text-blue-500 { color: #3b82f6; }
        .text-purple-500 { color: #a855f7; }
        .text-red-500 { color: #ef4444; }
        .text-green-500 { color: #22c55e; }
        .text-yellow-500 { color: #f59e0b; }
        .text-indigo-500 { color: #6366f1; }
        .text-teal-500 { color: #14b8a6; }
        .text-cyan-500 { color: #06b6d4; }
    `;

    // Effect to apply dark mode class to body
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    // Function to update AI Focus content
    const updateAIFocus = () => {
        const randomIndex = Math.floor(Math.random() * aiFocusMessages.length);
        setCurrentAIFocus(aiFocusMessages[randomIndex]);
    };

    // Function to render AI Recommendations
    const renderRecommendations = () => {
        const shuffledRecommendations = [...recommendations].sort(() => 0.5 - Math.random()).slice(0, 4);
        setCurrentRecommendations(shuffledRecommendations);
    };

    // Handle section switching
    const handleSectionChange = (sectionId, courseId = null) => {
        let targetSection = sectionId;
        if (sectionId.startsWith('course-')) {
            targetSection = 'course-detail-content';
            setSelectedCourseId(courseId);
        } else {
            setSelectedCourseId(null);
        }
        setActiveSection(targetSection);
        window.history.pushState(null, '', `#${sectionId.replace('-content', '')}`);

        // Focus the main content area for accessibility
        if (mainContentAreaRef.current) {
            mainContentAreaRef.current.focus();
        }
    };

    // Handle deep linking on initial load
    useEffect(() => {
        updateAIFocus();
        renderRecommendations();

        const initialHash = window.location.hash.substring(1);
        if (initialHash) {
            if (initialHash.startsWith('course-')) {
                handleSectionChange(initialHash, initialHash);
            } else {
                handleSectionChange(initialHash + '-content');
            }
        } else {
            handleSectionChange('dashboard-content');
        }
    }, []); // Run only once on component mount

    // Handle AI Chat Send
    const handleSendChat = async () => {
        if (chatInput.trim() === '') return;

        const newUserMessage = { sender: 'You', text: chatInput.trim() };
        setChatMessages(prevMessages => [...prevMessages, newUserMessage]);
        setChatInput('');
        setChatLoading(true);

        // Scroll to bottom after adding user message
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }

        // Simulate AI response
        setTimeout(() => {
            setChatLoading(false);
            let aiResponseText = '';
            const lowerCaseMessage = newUserMessage.text.toLowerCase();

            if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
                aiResponseText = 'Hello! How can I assist you with your learning today?';
            } else if (lowerCaseMessage.includes('progress')) {
                aiResponseText = 'You are making excellent progress! Keep reviewing the advanced topics.';
            } else if (lowerCaseMessage.includes('recommend')) {
                aiResponseText = 'I recommend focusing on "Advanced React Patterns" next. It aligns with your current learning path.';
            } else if (lowerCaseMessage.includes('deadline')) {
                aiResponseText = 'Remember, Project Alpha is due in 2 days. Make sure to allocate enough time!';
            } else {
                aiResponseText = 'That\'s an interesting question! I\'m still learning, but I can help you with your learning path and resources.';
            }

            setChatMessages(prevMessages => [...prevMessages, { sender: 'AI Tutor', text: aiResponseText }]);

            // Scroll to bottom after AI response
            if (chatHistoryRef.current) {
                chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
            }
        }, 1500);
    };

    // Profile dropdown state
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target) &&
                profileAreaRef.current && !profileAreaRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Get the selected course for detail view
    const currentCourseDetail = courses.find(c => c.id === selectedCourseId);

    return (
        <div className={`custom-scrollbar ${isDarkMode ? 'dark' : ''}`}>
            {/* Inject custom styles */}
            <style>{customStyles}</style>
            {/* Font Awesome CDN */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

            <header className="app-header">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button
                        id="menu-toggle"
                        className="header-button"
                        aria-label="Toggle sidebar"
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        aria-expanded={!isSidebarCollapsed}
                    >
                        <i className="fas fa-bars text-xl"></i>
                    </button>
                    <div style={{ marginLeft: '1rem', fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-blue-600)' }}>AI Dashboard</div>
                </div>

                <div className="search-input-wrapper">
                    <input
                        type="text"
                        id="search-input"
                        placeholder="Search resources, topics, or insights..."
                        className="search-input"
                        aria-label="Search input"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                console.log(`Simulating search for: "${e.target.value}"`);
                                e.target.blur();
                            }
                        }}
                    />
                </div>

                <div className="header-buttons">
                    <button
                        ref={notificationButtonRef}
                        id="notification-button"
                        className="header-button"
                        aria-label="Notifications"
                        aria-haspopup="true"
                        aria-expanded={isNotificationModalOpen}
                        onClick={() => setIsNotificationModalOpen(true)}
                    >
                        <i className="fas fa-bell text-lg"></i>
                    </button>
                    <button
                        ref={chatAiButtonRef}
                        id="chat-ai-button"
                        className="header-button"
                        aria-label="Chat with AI Tutor"
                        aria-haspopup="true"
                        aria-expanded={isChatModalOpen}
                        onClick={() => setIsChatModalOpen(true)}
                    >
                        <i className="fas fa-robot text-lg"></i>
                    </button>
                    <button
                        id="theme-toggle"
                        className="header-button"
                        aria-label={isDarkMode ? 'Toggle light theme' : 'Toggle dark theme'}
                        onClick={() => setIsDarkMode(!isDarkMode)}
                    >
                        <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'} text-lg`} id="theme-icon"></i>
                    </button>
                    <div
                        ref={profileAreaRef}
                        id="profile-area"
                        className="profile-area"
                        aria-haspopup="true"
                        aria-expanded={isProfileDropdownOpen}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsProfileDropdownOpen(!isProfileDropdownOpen);
                        }}
                    >
                        <img src="https://placehold.co/36x36/60A5FA/FFFFFF?text=JP" alt="User Avatar" className="profile-avatar" aria-label="User profile image" />
                        <span className="profile-name">Jane P.</span>
                        {isProfileDropdownOpen && (
                            <div ref={profileDropdownRef} id="profile-dropdown" className="dropdown-menu">
                                <ul style={{ padding: '0.25rem 0' }} role="menu" aria-orientation="vertical">
                                    <li><a href="#profile-settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700" role="menuitem" onClick={() => { handleSectionChange('profile-settings-content'); setIsProfileDropdownOpen(false); }}>View Profile</a></li>
                                    <li><a href="#account-settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700" role="menuitem" onClick={() => { handleSectionChange('account-settings-content'); setIsProfileDropdownOpen(false); }}>Account Settings</a></li>
                                    <li><a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700" role="menuitem" onClick={() => { console.log('Sign Out clicked'); setIsProfileDropdownOpen(false); }}>Sign Out</a></li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                <aside id="sidebar" className={`sidebar-panel custom-scrollbar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
                    <nav style={{ marginBottom: '0.5rem' }} role="navigation">
                        <a
                            href="#dashboard"
                            className={`sidebar-link ${activeSection === 'dashboard-content' ? 'active' : ''}`}
                            aria-current={activeSection === 'dashboard-content' ? 'page' : undefined}
                            onClick={() => handleSectionChange('dashboard-content')}
                        >
                            <i className="fas fa-chart-line"></i>
                            <span>Dashboard</span>
                        </a>
                        <a
                            href="#my-courses"
                            className={`sidebar-link ${activeSection === 'my-courses-content' ? 'active' : ''}`}
                            aria-current={activeSection === 'my-courses-content' ? 'page' : undefined}
                            onClick={() => handleSectionChange('my-courses-content')}
                        >
                            <i className="fas fa-book-open"></i>
                            <span>My Courses</span>
                        </a>
                        <a
                            href="#progress"
                            className={`sidebar-link ${activeSection === 'progress-content' ? 'active' : ''}`}
                            aria-current={activeSection === 'progress-content' ? 'page' : undefined}
                            onClick={() => handleSectionChange('progress-content')}
                        >
                            <i className="fas fa-trophy"></i>
                            <span>Progress</span>
                        </a>
                        <a
                            href="#quizzes"
                            className={`sidebar-link ${activeSection === 'quizzes-content' ? 'active' : ''}`}
                            aria-current={activeSection === 'quizzes-content' ? 'page' : undefined}
                            onClick={() => handleSectionChange('quizzes-content')}
                        >
                            <i className="fas fa-question-circle"></i>
                            <span>Quizzes</span>
                        </a>
                        <a
                            href="#explore"
                            className={`sidebar-link ${activeSection === 'explore-content' ? 'active' : ''}`}
                            aria-current={activeSection === 'explore-content' ? 'page' : undefined}
                            onClick={() => handleSectionChange('explore-content')}
                        >
                            <i className="fas fa-compass"></i>
                            <span>Explore</span>
                        </a>
                    </nav>
                    <hr style={{ margin: '1.5rem 0', borderColor: '#e5e7eb' }} />
                    <div style={{ marginBottom: '0.5rem' }}>
                        <a
                            href="#settings"
                            className={`sidebar-link ${activeSection === 'settings-content' ? 'active' : ''}`}
                            aria-current={activeSection === 'settings-content' ? 'page' : undefined}
                            onClick={() => handleSectionChange('settings-content')}
                        >
                            <i className="fas fa-cog"></i>
                            <span>Settings</span>
                        </a>
                        <a
                            href="#support"
                            className={`sidebar-link ${activeSection === 'support-content' ? 'active' : ''}`}
                            aria-current={activeSection === 'support-content' ? 'page' : undefined}
                            onClick={() => handleSectionChange('support-content')}
                        >
                            <i className="fas fa-life-ring"></i>
                            <span>Support</span>
                        </a>
                    </div>
                    <div className="sidebar-promo" style={{ marginTop: '2rem', padding: '1rem', backgroundImage: 'linear-gradient(to right, #eff6ff, #f3e8ff)', borderRadius: '0.5rem', boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)' }}>
                        <p style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>Boost your learning!</p>
                        <p style={{ fontSize: '0.75rem', marginBottom: '0.75rem', color: '#1f2937' }}>Upgrade to Premium for exclusive content and AI coaching.</p>
                        <button style={{ width: '100%', backgroundColor: '#3b82f6', color: '#ffffff', fontSize: '0.875rem', padding: '0.5rem 0', borderRadius: '0.375rem', transition: 'background-color 0.2s' }}>Upgrade Now</button>
                    </div>
                </aside>

                <main ref={mainContentAreaRef} id="main-content-area" className="main-content-area custom-scrollbar" role="main" aria-live="polite" tabIndex="-1">
                    {activeSection === 'dashboard-content' && (
                        <section id="dashboard-content" className="content-section" tabIndex="-1">
                            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-gray-800)' }}>Welcome back, Jane!</h1>

                            <div className="card-grid lg-cols-3">
                                <div className="card ai-focus-card">
                                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-blue-600)', marginBottom: '1rem' }}>Today's AI Focus</h2>
                                    <p id="ai-focus-content" style={{ color: 'var(--text-gray-700)', marginBottom: '1rem' }} dangerouslySetInnerHTML={{ __html: currentAIFocus }}></p>
                                    <button
                                        id="refresh-ai-focus"
                                        className="refresh-button"
                                        onClick={updateAIFocus}
                                    >
                                        <i className="fas fa-sync-alt" style={{ marginRight: '0.5rem' }}></i> Refresh Focus
                                    </button>
                                </div>

                                <div className="card">
                                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-gray-800)' }}>Your Progress Snapshot</h2>
                                    <p style={{ color: 'var(--text-gray-700)', marginBottom: '1rem' }}>
                                        You've completed 75% of your current learning path. Keep up the great work!
                                    </p>
                                    <div className="progress-bar-container">
                                        <div className="progress-bar-fill" style={{ width: '75%' }}></div>
                                    </div>
                                    <p className="progress-text">Next milestone: Finish 'Advanced React Patterns'.</p>
                                </div>

                                <div className="card">
                                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-gray-800)' }}>Upcoming Deadlines</h2>
                                    <ul className="deadline-list" style={{ marginBottom: '0.75rem', color: 'var(--text-gray-700)' }}>
                                        <li>
                                            <span><i className="fas fa-calendar-alt icon"></i> Project Alpha Submission</span>
                                            <span className="status-text status-red">2 days</span>
                                        </li>
                                        <li>
                                            <span><i className="fas fa-calendar-alt icon"></i> Module 5 Quiz</span>
                                            <span className="status-text status-yellow">5 days</span>
                                        </li>
                                        <li>
                                            <span><i className="fas fa-calendar-alt icon"></i> Peer Review for Essay</span>
                                            <span className="status-text">1 week</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.25rem', color: 'var(--text-gray-800)' }}>AI Recommended for You</h2>
                            <div className="card-grid sm-cols-2 lg-cols-3 xl-cols-4">
                                {currentRecommendations.map(item => (
                                    <div key={item.id} className={`card recommendation-card`} style={{ borderTopColor: `var(--text-${item.color}-500)` }}>
                                        <img src={item.thumbnail} alt={item.title} style={{ width: '100%', height: '10rem', objectFit: 'cover', borderRadius: '0.375rem', marginBottom: '0.75rem' }} />
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                                            <i className={`${item.icon} type-icon`} style={{ color: `var(--text-${item.color}-500)` }}></i>
                                            <span className="type-label">{item.type}</span>
                                        </div>
                                        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-gray-800)' }}>{item.title}</h3>
                                        <p style={{ color: 'var(--text-gray-700)', fontSize: '0.875rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</p>
                                        <button className="learn-more-button">
                                            Learn More
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <button
                                id="refresh-ai-reco"
                                className="btn-primary"
                                style={{ marginTop: '2rem', display: 'block', margin: '2rem auto 0 auto' }}
                                onClick={renderRecommendations}
                            >
                                <i className="fas fa-sync-alt" style={{ marginRight: '0.5rem' }}></i> Refresh AI Recommendations
                            </button>
                        </section>
                    )}

                    {activeSection === 'my-courses-content' && (
                        <section id="my-courses-content" className="content-section" tabIndex="-1">
                            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-gray-800)' }}>My Courses</h1>
                            <div className="card-grid lg-cols-3">
                                {courses.map(course => (
                                    <div
                                        key={course.id}
                                        className="card course-card"
                                        data-course-id={course.id}
                                        tabIndex="0"
                                        role="link"
                                        aria-label={`View course: ${course.title}`}
                                        onClick={() => handleSectionChange(`course-${course.id}`, course.id)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                handleSectionChange(`course-${course.id}`, course.id);
                                            }
                                        }}
                                    >
                                        <img src={course.thumbnail} alt={`Thumbnail for ${course.title}`} style={{ width: '100%', height: '8rem', objectFit: 'cover', borderRadius: '0.375rem', marginBottom: '0.75rem' }} />
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-gray-800)' }}>{course.title}</h3>
                                        <p style={{ color: 'var(--text-gray-700)', fontSize: '0.875rem', marginBottom: '0.75rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{course.description}</p>
                                        <p style={{ color: 'var(--text-gray-700)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>Progress: {course.progress}%</p>
                                        <div className="progress-bar-container" role="progressbar" aria-valuenow={course.progress} aria-valuemin="0" aria-valuemax="100">
                                            <div style={{ backgroundColor: '#22c55e', height: '100%', borderRadius: '9999px', width: `${course.progress}%` }}></div>
                                        </div>
                                        <button className="continue-button" style={{ marginTop: '1rem' }}>Continue Learning</button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {activeSection === 'course-detail-content' && currentCourseDetail && (
                        <section id="course-detail-content" className="content-section" tabIndex="-1">
                            <button
                                id="back-to-courses"
                                className="back-button"
                                onClick={() => handleSectionChange('my-courses-content')}
                            >
                                <i className="fas fa-arrow-left" style={{ marginRight: '0.5rem' }}></i> Back to My Courses
                            </button>
                            <h1 id="course-detail-title" style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-gray-800)' }}>{currentCourseDetail.title}</h1>
                            <p id="course-detail-description" style={{ color: 'var(--text-gray-700)', marginBottom: '1.5rem' }}>{currentCourseDetail.description}</p>

                            <div className="card" style={{ marginBottom: '1.5rem' }}>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-gray-800)' }}>Course Progress</h2>
                                <div className="progress-bar-container" style={{ marginBottom: '0.5rem' }}>
                                    <div id="course-detail-progress-bar" className="progress-bar-fill" style={{ width: `${currentCourseDetail.progress}%` }}></div>
                                </div>
                                <p id="course-detail-progress-text" className="progress-text">Overall Progress: {currentCourseDetail.progress}%</p>
                            </div>

                            <div className="card">
                                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-gray-800)' }}>Course Modules</h2>
                                <div id="course-modules-list" style={{ marginBottom: '1rem' }}>
                                    {currentCourseDetail.modules.map(module => (
                                        <div key={module.id} className="course-module-item" style={{ marginBottom: '1rem' }}>
                                            <div>
                                                <h3 style={{ fontWeight: '600', color: 'var(--text-gray-800)' }}>{module.title}</h3>
                                                <p style={{ fontSize: '0.875rem', color: 'var(--text-gray-600)' }}>Status: {module.completed ? 'Completed' : 'Pending'}</p>
                                            </div>
                                            <a href={module.videoUrl} target="_blank" rel="noopener noreferrer" className="watch-video-button" aria-label={`Watch video for ${module.title}`}>
                                                <i className="fas fa-play-circle" style={{ marginRight: '0.5rem' }}></i> Watch Video
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {activeSection === 'progress-content' && (
                        <section id="progress-content" className="content-section" tabIndex="-1">
                            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-gray-800)' }}>Your Learning Progress</h1>
                            <div className="card">
                                <p style={{ color: 'var(--text-gray-700)', marginBottom: '1rem' }}>Detailed analytics about your completed lessons, mastery levels, and time spent learning.</p>
                                <img src="https://placehold.co/600x250/C0C0C0/333333?text=Progress+Graph+Placeholder" alt="Progress Graph" style={{ width: '100%', borderRadius: '0.375rem', marginBottom: '1rem' }} />
                                <ul style={{ listStyleType: 'disc', listStylePosition: 'inside', color: 'var(--text-gray-700)', marginBottom: '0.5rem' }}>
                                    <li><strong>Hours Logged This Week:</strong> 12.5 hrs</li>
                                    <li><strong>Courses Completed:</strong> 3 of 5</li>
                                    <li><strong>Average Quiz Score:</strong> 88%</li>
                                    <li><strong>Mastery Level (Python):</strong> Advanced</li>
                                    <li><strong>Next Goal:</strong> Complete "Advanced React Patterns" by end of month.</li>
                                </ul>
                            </div>
                        </section>
                    )}

                    {activeSection === 'quizzes-content' && (
                        <section id="quizzes-content" className="content-section" tabIndex="-1">
                            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-gray-800)' }}>Quizzes & Assessments</h1>
                            <div className="card-grid sm-cols-2">
                                <div className="card">
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-gray-800)', marginBottom: '0.5rem' }}>JavaScript Basics Quiz</h3>
                                    <p style={{ color: 'var(--text-gray-700)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>Attempts: 2 | Last Score: 75%</p>
                                    <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Retake Quiz</button>
                                </div>
                                <div className="card">
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-gray-800)', marginBottom: '0.5rem' }}>Advanced SQL Challenge</h3>
                                    <p style={{ color: 'var(--text-gray-700)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>Attempts: 1 | Last Score: N/A</p>
                                    <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Start Quiz</button>
                                </div>
                                <div className="card">
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-gray-800)', marginBottom: '0.5rem' }}>React Component Lifecycle</h3>
                                    <p style={{ color: 'var(--text-gray-700)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>Attempts: 0 | Recommended: Yes</p>
                                    <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Take Quiz</button>
                                </div>
                            </div>
                        </section>
                    )}

                    {activeSection === 'explore-content' && (
                        <section id="explore-content" className="content-section" tabIndex="-1">
                            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-gray-800)' }}>Explore New Content</h1>
                            <div className="card-grid lg-cols-3">
                                <div className="card">
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-gray-800)', marginBottom: '0.5rem' }}>Generative AI Workshop</h3>
                                    <p style={{ color: 'var(--text-gray-700)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>Discover the latest in AI content generation and practical applications.</p>
                                    <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Enroll</button>
                                </div>
                                <div className="card">
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-gray-800)', marginBottom: '0.5rem' }}>Cybersecurity Basics</h3>
                                    <p style={{ color: 'var(--text-gray-700)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>Essential knowledge for online safety and protecting your digital footprint.</p>
                                    <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Enroll</button>
                                </div>
                                <div className="card">
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-gray-800)', marginBottom: '0.5rem' }}>Data Visualization with D3.js</h3>
                                    <p style={{ color: 'var(--text-gray-700)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>Learn to create stunning interactive data visualizations for the web.</p>
                                    <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Explore</button>
                                </div>
                            </div>
                        </section>
                    )}

                    {activeSection === 'settings-content' && (
                        <section id="settings-content" className="content-section" tabIndex="-1">
                            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-gray-800)' }}>Settings</h1>
                            <div className="card">
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-gray-800)', marginBottom: '1rem' }}>Account Preferences</h3>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label htmlFor="username-input" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-gray-700)', marginBottom: '0.25rem' }}>Username</label>
                                    <input type="text" id="username-input" defaultValue="Jane P." aria-label="Username" />
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label htmlFor="email-input" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-gray-700)', marginBottom: '0.25rem' }}>Email</label>
                                    <input type="email" id="email-input" defaultValue="jane.p@example.com" aria-label="Email address" />
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label htmlFor="password-input" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-gray-700)', marginBottom: '0.25rem' }}>Password</label>
                                    <input type="password" id="password-input" defaultValue="********" aria-label="Password" />
                                    <button style={{ marginTop: '0.5rem', color: '#3b82f6', fontSize: '0.875rem', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>Change Password</button>
                                </div>

                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-gray-800)', marginTop: '2rem', marginBottom: '1rem' }}>Notification Settings</h3>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <label htmlFor="notifications-toggle" style={{ color: 'var(--text-gray-700)' }}>Email Notifications</label>
                                    <input type="checkbox" id="notifications-toggle" className="form-checkbox" defaultChecked aria-label="Toggle email notifications" />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <label htmlFor="in-app-notifications-toggle" style={{ color: 'var(--text-gray-700)' }}>In-App Notifications</label>
                                    <input type="checkbox" id="in-app-notifications-toggle" className="form-checkbox" defaultChecked aria-label="Toggle in-app notifications" />
                                </div>

                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-gray-800)', marginTop: '2rem', marginBottom: '1rem' }}>General Settings</h3>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <label htmlFor="language-select" style={{ color: 'var(--text-gray-700)' }}>Language</label>
                                    <select id="language-select" style={{ display: 'block', width: '50%' }} aria-label="Select language">
                                        <option>English</option>
                                        <option>Spanish</option>
                                        <option>French</option>
                                    </select>
                                </div>
                                <button className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Save Changes</button>
                            </div>
                        </section>
                    )}

                    {activeSection === 'support-content' && (
                        <section id="support-content" className="content-section" tabIndex="-1">
                            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-gray-800)' }}>Support & Help</h1>
                            <div className="card">
                                <p style={{ color: 'var(--text-gray-700)', marginBottom: '1rem' }}>If you need help, please check our comprehensive FAQ section or contact our dedicated support team directly.</p>
                                <button className="btn-primary" style={{ marginRight: '1rem' }}>View FAQ</button>
                                <button className="btn-secondary">Contact Support</button>
                            </div>
                        </section>
                    )}

                    {activeSection === 'profile-settings-content' && (
                        <section id="profile-settings-content" className="content-section" tabIndex="-1">
                            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-gray-800)' }}>My Profile</h1>
                            <div className="card">
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <img src="https://placehold.co/100x100/60A5FA/FFFFFF?text=JP" alt="User Avatar" style={{ width: '6rem', height: '6rem', borderRadius: '9999px', objectFit: 'cover', border: '4px solid #60a5fa', marginBottom: '1rem' }} />
                                    <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>Change Profile Picture</button>
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-gray-700)' }}>Full Name:</label>
                                    <p style={{ fontSize: '1.125rem', color: 'var(--text-gray-800)' }}>Jane P. Doe</p>
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-gray-700)' }}>Learning Path:</label>
                                    <p style={{ fontSize: '1.125rem', color: 'var(--text-gray-800)' }}>Full Stack Web Development</p>
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-gray-700)' }}>Member Since:</label>
                                    <p style={{ fontSize: '1.125rem', color: 'var(--text-gray-800)' }}>January 2023</p>
                                </div>
                                <button className="btn-primary">Edit Profile</button>
                            </div>
                        </section>
                    )}

                    {activeSection === 'account-settings-content' && (
                        <section id="account-settings-content" className="content-section" tabIndex="-1">
                            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-gray-800)' }}>Account Settings</h1>
                            <div className="card">
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-gray-800)', marginBottom: '1rem' }}>Security</h3>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label htmlFor="current-password-input" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-gray-700)', marginBottom: '0.25rem' }}>Current Password</label>
                                    <input type="password" id="current-password-input" aria-label="Current password" />
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label htmlFor="new-password-input" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-gray-700)', marginBottom: '0.25rem' }}>New Password</label>
                                    <input type="password" id="new-password-input" aria-label="New password" />
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label htmlFor="confirm-password-input" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-gray-700)', marginBottom: '0.25rem' }}>Confirm New Password</label>
                                    <input type="password" id="confirm-password-input" aria-label="Confirm new password" />
                                </div>
                                <button className="btn-primary">Update Password</button>

                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-gray-800)', marginTop: '2rem', marginBottom: '1rem' }}>Privacy Controls</h3>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <label htmlFor="data-sharing-toggle" style={{ color: 'var(--text-gray-700)' }}>Share Anonymized Data</label>
                                    <input type="checkbox" id="data-sharing-toggle" className="form-checkbox" defaultChecked aria-label="Toggle data sharing" />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <label htmlFor="activity-tracking-toggle" style={{ color: 'var(--text-gray-700)' }}>Track Learning Activity</label>
                                    <input type="checkbox" id="activity-tracking-toggle" className="form-checkbox" defaultChecked aria-label="Toggle learning activity tracking" />
                                </div>
                                <button className="btn-primary">Save Privacy Settings</button>

                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-gray-800)', marginTop: '2rem', marginBottom: '1rem' }}>Danger Zone</h3>
                                <button className="btn-primary" style={{ backgroundColor: '#ef4444', transition: 'background-color 0.2s' }}>Delete Account</button>
                            </div>
                        </section>
                    )}
                </main>
            </div>

            {/* AI Chat Modal */}
            {isChatModalOpen && (
                <div id="ai-chat-modal" className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="chat-modal-title">
                    <div className="modal-content">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h2 id="chat-modal-title" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-gray-900)' }}>Chat with AI Tutor <i className="fas fa-robot" style={{ marginLeft: '0.5rem', color: '#3b82f6' }}></i></h2>
                            <button
                                id="close-chat-modal"
                                style={{ padding: '0.5rem', borderRadius: '9999px', background: 'none', border: 'none', cursor: 'pointer' }}
                                onClick={() => { setIsChatModalOpen(false); chatAiButtonRef.current?.focus(); }}
                            >
                                <i className="fas fa-times text-lg"></i>
                            </button>
                        </div>
                        <div ref={chatHistoryRef} id="chat-history" className="custom-scrollbar" style={{ height: '16rem', overflowY: 'auto', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem', backgroundColor: '#f9fafb' }} tabIndex="0" aria-live="polite" aria-atomic="true">
                            {chatMessages.map((message, index) => (
                                <div key={index} style={{ marginBottom: '0.5rem', textAlign: message.sender === 'You' ? 'right' : 'left', color: message.sender === 'You' ? 'var(--text-gray-800)' : 'var(--text-gray-700)' }}>
                                    <span style={{ fontWeight: '600', color: message.sender === 'You' ? 'var(--text-green-600)' : 'var(--text-blue-600)' }}>{message.sender}:</span> {message.text}
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex' }}>
                            <input
                                type="text"
                                id="chat-input"
                                placeholder="Ask your AI tutor a question..."
                                style={{ flex: 1, padding: '0.5rem', border: '1px solid #d1d5db', borderTopLeftRadius: '0.375rem', borderBottomLeftRadius: '0.375rem', outline: 'none' }}
                                aria-label="Chat input"
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyPress={(e) => { if (e.key === 'Enter') handleSendChat(); }}
                            />
                            <button
                                id="send-chat-button"
                                style={{ padding: '0.5rem', backgroundColor: '#3b82f6', color: '#ffffff', borderTopRightRadius: '0.375rem', borderBottomRightRadius: '0.375rem', transition: 'background-color 0.2s', border: 'none', cursor: 'pointer' }}
                                aria-label="Send message"
                                onClick={handleSendChat}
                            >
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                        {chatLoading && (
                            <p id="chat-loading-indicator" style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-gray-600)', marginTop: '0.5rem' }} aria-live="polite">AI Tutor is typing...</p>
                        )}
                    </div>
                </div>
            )}

            {/* Notification Modal */}
            {isNotificationModalOpen && (
                <div id="notification-modal" className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="notification-modal-title">
                    <div className="modal-content">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h2 id="notification-modal-title" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-gray-900)' }}>Notifications <i className="fas fa-bell" style={{ marginLeft: '0.5rem', color: '#f59e0b' }}></i></h2>
                            <button
                                id="close-notification-modal"
                                style={{ padding: '0.5rem', borderRadius: '9999px', background: 'none', border: 'none', cursor: 'pointer' }}
                                onClick={() => { setIsNotificationModalOpen(false); notificationButtonRef.current?.focus(); }}
                            >
                                <i className="fas fa-times text-lg"></i>
                            </button>
                        </div>
                        <div className="custom-scrollbar" style={{ height: '16rem', overflowY: 'auto', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem', backgroundColor: '#f9fafb' }} tabIndex="0" aria-live="polite" aria-atomic="true">
                            <ul style={{ marginBottom: '0.75rem' }}>
                                <li style={{ padding: '0.75rem', backgroundColor: '#ffffff', borderRadius: '0.375rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', marginBottom: '0.75rem' }} role="alert">
                                    <p style={{ fontWeight: '600', color: 'var(--text-gray-800)' }}>New Quiz Available!</p>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--text-gray-600)' }}>"Advanced JavaScript Concepts" quiz is now live.</p>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-gray-500)' }}>2 hours ago</span>
                                </li>
                                <li style={{ padding: '0.75rem', backgroundColor: '#ffffff', borderRadius: '0.375rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', marginBottom: '0.75rem' }} role="alert">
                                    <p style={{ fontWeight: '600', color: 'var(--text-gray-800)' }}>Course Update</p>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--text-gray-600)' }}>"Python for Data Science" received new practice problems.</p>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-gray-500)' }}>1 day ago</span>
                                </li>
                                <li style={{ padding: '0.75rem', backgroundColor: '#ffffff', borderRadius: '0.375rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', marginBottom: '0.75rem' }} role="alert">
                                    <p style={{ fontWeight: '600', color: 'var(--text-gray-800)' }}>AI Focus Refreshed</p>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--text-gray-600)' }}>Your daily learning focus has been updated by the AI.</p>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-gray-500)' }}>Today</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;