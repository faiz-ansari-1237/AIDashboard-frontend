// src/data/courses.js
const courses = [
    {
        id: 'web-dev-bootcamp',
        title: 'The Complete 2023 Web Development Bootcamp',
        instructor: 'Dr. Angela Yu',
        description: 'Master Web Development with HTML, CSS, JavaScript, Node, React, MongoDB, and more!',
        image: 'https://placehold.co/150x150/60A5FA/FFFFFF?text=Web+Dev', // Specific image for Web Dev
        category: 'Development',
        duration: '60 hours',
        lessons: 500,
        level: 'Beginner',
        tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'Web Development'],
        price: 129.99,
        lastUpdated: '2023-09-15',
        progress: 75,
        lastAccessed: '2024-05-28T10:00:00Z'
    },
    {
        id: 'python-for-data-science',
        title: 'Python for Data Science and Machine Learning Bootcamp',
        instructor: 'Jose Portilla',
        description: 'Learn Python for Data Science, Machine Learning, Data Visualization, Matplotlib, Seaborn, Plotly, Scikit-learn, and more!',
        image: 'https://placehold.co/150x150/34D399/FFFFFF?text=Python+DS', // Specific image for Python DS
        category: 'Data Science',
        duration: '25 hours',
        lessons: 200,
        level: 'Intermediate',
        tags: ['Python', 'Data Science', 'Machine Learning', 'Pandas', 'NumPy'],
        price: 99.99,
        lastUpdated: '2023-10-01',
        progress: 30,
        lastAccessed: '2024-05-25T14:30:00Z'
    },
    {
        id: 'react-redux-saga',
        title: 'React, Redux & Saga Advanced Concepts',
        instructor: 'Stephen Grider',
        description: 'Dive deep into React with Redux and Redux Saga for building complex applications.',
        image: 'https://placehold.co/150x150/8B5CF6/FFFFFF?text=React+Adv', // Specific image for React
        category: 'Development',
        duration: '18 hours',
        lessons: 150,
        level: 'Advanced',
        tags: ['React', 'Redux', 'Redux Saga', 'Frontend'],
        price: 109.99,
        lastUpdated: '2023-11-20',
        progress: 0,
        lastAccessed: null
    },
    {
        id: 'cloud-computing-fundamentals',
        title: 'Cloud Computing Fundamentals: AWS, Azure, Google Cloud',
        instructor: 'Ryan Kroonenburg',
        description: 'Understand the core concepts of cloud computing and master the basics of the top cloud platforms.',
        image: 'https://placehold.co/150x150/FBBF24/FFFFFF?text=Cloud+Comp', // Specific image for Cloud
        category: 'Cloud',
        duration: '40 hours',
        lessons: 300,
        level: 'Beginner',
        tags: ['Cloud Computing', 'AWS', 'Azure', 'Google Cloud'],
        price: 119.99,
        lastUpdated: '2024-01-05',
        progress: 90,
        lastAccessed: '2024-05-27T08:15:00Z'
    },
    {
        id: 'cybersecurity-basics',
        title: 'Cybersecurity for Beginners',
        instructor: 'Troy Hunt',
        description: 'Learn the fundamentals of cybersecurity and protect yourself from online threats.',
        image: 'https://placehold.co/150x150/EF4444/FFFFFF?text=CyberSec', // Specific image for Cybersecurity
        category: 'Security',
        duration: '15 hours',
        lessons: 100,
        level: 'Beginner',
        tags: ['Cybersecurity', 'Online Safety', 'Network Security'],
        price: 79.99,
        lastUpdated: '2024-02-10',
        progress: 50,
        lastAccessed: '2024-05-26T11:00:00Z'
    },
    {
        id: 'ai-ml-deep-learning',
        title: 'Artificial Intelligence & Machine Learning with Deep Learning',
        instructor: 'Kirill Eremenko',
        description: 'A comprehensive course covering AI, Machine Learning, and Deep Learning concepts with practical examples.',
        image: 'https://placehold.co/150x150/3B82F6/FFFFFF?text=AI+ML', // Specific image for AI/ML
        category: 'Artificial Intelligence',
        duration: '35 hours',
        lessons: 280,
        level: 'Intermediate',
        tags: ['AI', 'Machine Learning', 'Deep Learning', 'Neural Networks'],
        price: 149.99,
        lastUpdated: '2024-03-01',
        progress: 10,
        lastAccessed: '2024-05-27T15:00:00Z'
    },
    {
        id: 'mobile-dev-flutter',
        title: 'Flutter & Dart - The Complete Guide',
        instructor: 'Maximilian Schwarzmüller',
        description: 'Build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.',
        image: 'https://placehold.co/150x150/EC4899/FFFFFF?text=Flutter', // Specific image for Flutter
        category: 'Mobile Development',
        duration: '45 hours',
        lessons: 350,
        level: 'Beginner',
        tags: ['Flutter', 'Dart', 'Mobile Apps', 'Cross-Platform'],
        price: 139.99,
        lastUpdated: '2024-04-01',
        progress: 0,
        lastAccessed: null
    },
    {
        id: 'data-structures-algorithms-java',
        title: 'Data Structures & Algorithms in Java',
        instructor: 'Tim Buchalka',
        description: 'Master fundamental data structures and algorithms using Java, essential for coding interviews.',
        image: 'https://placehold.co/150x150/10B981/FFFFFF?text=DSA+Java', // Specific image for DSA Java
        category: 'Computer Science',
        duration: '50 hours',
        lessons: 400,
        level: 'Intermediate',
        tags: ['Java', 'Data Structures', 'Algorithms', 'Coding Interview'],
        price: 119.99,
        lastUpdated: '2023-08-01',
        progress: 100, // This course is completed
        lastAccessed: '2024-05-20T09:00:00Z'
    },
    {
        id: 'ux-ui-design-masterclass',
        title: 'The Ultimate UX/UI Design Masterclass',
        instructor: 'Joe Natoli',
        description: 'Learn UX/UI design from scratch, including user research, wireframing, prototyping, and usability testing.',
        image: 'https://placehold.co/150x150/A78BFA/FFFFFF?text=UX/UI', // Specific image for UX/UI
        category: 'Design',
        duration: '20 hours',
        lessons: 180,
        level: 'Beginner',
        tags: ['UX Design', 'UI Design', 'Figma', 'Prototyping'],
        price: 89.99,
        lastUpdated: '2024-05-01',
        progress: 20,
        lastAccessed: '2024-05-28T09:30:00Z'
    }
];

export default courses;
