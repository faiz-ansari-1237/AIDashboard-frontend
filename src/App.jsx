import React, { useState, useEffect, useRef, useCallback } from 'react';

// Import individual components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MyCourses from './components/MyCourses';
import CourseDetail from './components/CourseDetail';
import ProgressContent from './components/ProgressContent';
import QuizzesContent from './components/QuizzesContent';
import ExploreContent from './components/ExploreContent';
import SettingsContent from './components/SettingsContent';
import SupportContent from './components/SupportContent';
import ProfileSettingsContent from './components/ProfileSettingsContent';
import AccountSettingsContent from './components/AccountSettingsContent';
import AIChatModal from './components/AIChatModal';
import NotificationModal from './components/NotificationModal';
import LoginModal from './components/LoginModal';

// Import mock data and styles from their new dedicated files
import recommendations from './data/recommendations';
import mockCourses from './data/courses'; // Ensure this mock data exists and is properly structured
import './styles/customStyles.css';


const aiFocusMessages = [
    `Your AI tutor suggests reviewing **Data Structures Module 3** and spending 30 minutes on **JavaScript algorithms**. You're close to mastering Lists!`,
    `Based on your recent activity, focus on **Cloud Computing Fundamentals** for the next 45 minutes. Pay attention to serverless architectures.`,
    `It seems you're struggling with **Advanced Calculus concepts**. Your AI tutor recommends re-watching Lecture 7 and trying Practice Set B.`,
    `Great progress on **Machine Learning!** Today, the AI suggests exploring **Reinforcement Learning basics** for 25 minutes.`,
    `Your upcoming deadline for **Project Alpha** is critical. The AI recommends dedicating the next 2 hours to completing the remaining tasks.`,
    `Time for a quick review! Your AI tutor suggests a 15-minute quiz on **CSS Flexbox and Grid** to solidify your frontend skills.`
];

const API_BASE_URL = 'https://aidashboard-backend.onrender.com/api';

// Helper function for authenticated fetches - This remains robust
const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem('token'); // Always get the latest token from localStorage
    const headers = {
        ...options.headers,
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, { ...options, headers });
    return response;
};


const App = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });
    const [activeSection, setActiveSection] = useState('dashboard-content');
    const [isChatModalOpen, setIsChatModalOpen] = useState(false);
    const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [selectedQuizId, setSelectedQuizId] = useState(null);
    const [currentAIFocus, setCurrentAIFocus] = useState('');
    const [currentRecommendations, setCurrentRecommendations] = useState([]);
    const [chatMessages, setChatMessages] = useState([
        { sender: 'AI Tutor', text: 'Hello Jane! How can I assist you with your learning today?' }
    ]);
    const [chatInput, setChatInput] = useState('');
    const [chatLoading, setChatLoading] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    // AUTHENTICATION STATES
    const [user, setUser] = useState(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isLoadingUser, setIsLoadingUser] = useState(true); // Tracks if the initial user session check is ongoing

    const [courses, setCourses] = useState([]);

    const [profileData, setProfileData] = useState({
        name: 'Guest',
        email: 'guest@example.com',
        memberSince: 'N/A',
        learningPath: 'N/A'
    });


    const mainContentAreaRef = useRef(null);
    const chatHistoryRef = useRef(null);
    const notificationButtonRef = useRef(null);
    const chatAiButtonRef = useRef(null);
    const profileAreaRef = useRef(null);
    const profileDropdownRef = useRef(null);
    const signInButtonRef = useRef(null);

    // Effect to apply/remove 'dark' class to the <body> element
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    // NEW/REFINED: Effect to check for existing token and restore user session on mount
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}` // Ensure token is sent for verification
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setUser({
                            id: data.user.id, // Store ID if needed for future features
                            username: data.user.username,
                            avatar: `https://placehold.co/36x36/60A5FA/FFFFFF?text=${data.user.username.charAt(0).toUpperCase()}${data.user.username.charAt(1) ? data.user.username.charAt(1).toUpperCase() : ''}`
                        });
                        setProfileData(prev => ({
                            ...prev,
                            name: data.user.username,
                            email: `${data.user.username.toLowerCase()}@example.com`,
                            memberSince: 'May 2024' // Or fetch from backend if stored
                        }));
                    } else {
                        // Token invalid or expired, clear it
                        console.error('Token verification failed:', response.status);
                        localStorage.removeItem('token');
                        setUser(null);
                    }
                } catch (error) {
                    console.error('Network error during token verification:', error);
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setIsLoadingUser(false); // User loading is complete regardless of whether a token was found or valid
        };

        checkAuth();
    }, []); // Run only once on mount

    // NEW: handleSignOut is defined before fetchCourses
    const handleSignOut = useCallback(() => { // Memoize handleSignOut as well
        localStorage.removeItem('token');
        setUser(null); // Setting user to null triggers the useEffect to fetch mock courses
        setIsProfileDropdownOpen(false);
        handleSectionChange('dashboard-content');
        setProfileData({
            name: 'Guest',
            email: 'guest@example.com',
            memberSince: 'N/A',
            learningPath: 'N/A'
        });
    }, []); // No dependencies for handleSignOut, so it's stable


    // REFINED: Memoized fetchCourses function
    const fetchCourses = useCallback(async () => {
        if (!user) { // Only proceed if a user object is present (meaning logged in or verified)
            setCourses(mockCourses); // Fallback if somehow called without a user (shouldn't happen with proper useEffect)
            return;
        }

        try {
            const response = await authFetch(`${API_BASE_URL}/courses`);
            if (!response.ok) {
                // If 401/403, the token might have expired while the user was active
                if (response.status === 401 || response.status === 403) {
                    handleSignOut(); // Force logout to clear invalid token
                    alert('Your session has expired. Please log in again.');
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCourses(data);
            console.log("Courses fetched from backend successfully!");
        } catch (error) {
            console.error("Failed to fetch courses from backend, falling back to mock data:", error);
            // setCourses(mockCourses); // If an error occurs even with a user, might still show mock
        }
    }, [user, handleSignOut]); // Dependency on user and handleSignOut (which is stable)

    // REFINED: Effect to trigger fetching courses
    useEffect(() => {
        if (!isLoadingUser) { // Ensure the initial user session check is complete
            if (user) { // If a user is logged in (or verified), fetch courses
                fetchCourses();
            } else { // If no user is logged in (and not loading), show mock data
                setCourses(mockCourses);
            }
        }
    }, [user, isLoadingUser, fetchCourses]); // Dependencies are clear

    const handleSignUp = async (username, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('User signed up successfully (backend response):', data.message);
                return { success: true, message: data.message };
            } else {
                console.error('Sign up error (backend response):', data.message);
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Network error during sign up:', error);
            return { success: false, message: 'Network error or server unreachable. Please ensure backend is running.' };
        }
    };

    const handleSignIn = async (username, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token); // Store token FIRST

                // Set user state which will trigger the fetchCourses useEffect shortly after
                setUser({
                    id: data.user.id, // Store ID if available and useful
                    username: data.user.username,
                    avatar: `https://placehold.co/36x36/60A5FA/FFFFFF?text=${data.user.username.charAt(0).toUpperCase()}${data.user.username.charAt(1) ? data.user.username.charAt(1).toUpperCase() : ''}`
                });
                setIsLoginModalOpen(false);
                setProfileData(prev => ({
                    ...prev,
                    name: data.user.username,
                    email: `${data.user.username.toLowerCase()}@example.com`,
                    memberSince: 'May 2024'
                }));
                handleSectionChange('dashboard-content');
                console.log('Login successful (backend response):', data.message);
                return { success: true, message: data.message };
            } else {
                console.error('Sign in error (backend response):', data.message);
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Network error during sign in:', error);
            return { success: false, message: 'Network error or server unreachable. Please ensure backend is running.' };
        }
    };

    const updateAIFocus = () => {
        const randomIndex = Math.floor(Math.random() * aiFocusMessages.length);
        setCurrentAIFocus(aiFocusMessages[randomIndex]);
    };

    const renderRecommendations = () => {
        const shuffledRecommendations = [...recommendations].sort(() => 0.5 - Math.random()).slice(0, 4);
        setCurrentRecommendations(shuffledRecommendations);
    };

    const handleSectionChange = (sectionId, itemId = null) => {
        let targetSection = sectionId;
        if (sectionId.startsWith('course-')) {
            targetSection = 'course-detail-content';
            setSelectedCourseId(itemId);
            setSelectedQuizId(null);
        } else if (sectionId === 'quizzes-content' && itemId) { // MODIFIED CONDITION: Check for exact string 'quizzes-content' and if itemId is provided
            targetSection = 'quizzes-content';
            setSelectedQuizId(itemId);
            setSelectedCourseId(null);
        }
        else {
            setSelectedCourseId(null);
            setSelectedQuizId(null);
        }
        setActiveSection(targetSection);
        window.history.pushState(null, '', `#${sectionId.replace('-content', '')}`);

        if (mainContentAreaRef.current) {
            mainContentAreaRef.current.focus();
        }
    };

    // Initial content loading on component mount (after user loading)
    useEffect(() => {
        if (!isLoadingUser) { // Ensure initial user check is complete before setting initial section
            updateAIFocus();
            renderRecommendations();

            const initialHash = window.location.hash.substring(1);
            if (initialHash) {
                if (initialHash.startsWith('course-')) {
                    handleSectionChange(initialHash, initialHash.replace('course-', ''));
                } else if (initialHash.startsWith('quiz-')) {
                    // This block handles direct URL access like #quiz-someid
                    // It will set selectedQuizId correctly
                    handleSectionChange('quizzes-content', initialHash.replace('quiz-', ''));
                }
                else {
                    handleSectionChange(initialHash + '-content');
                }
            } else {
                handleSectionChange('dashboard-content');
            }
        }
    }, [isLoadingUser]); // Depend on isLoadingUser so it runs after auth check

    const handleSendChat = async () => {
        if (chatInput.trim() === '') return;

        const newUserMessage = { sender: 'You', text: chatInput.trim() };
        setChatMessages(prevMessages => [...prevMessages, newUserMessage]);
        setChatInput('');
        setChatLoading(true);

        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }

        setTimeout(() => {
            setChatLoading(false);
            let aiResponseText = '';
            const lowerCaseMessage = newUserMessage.text.toLowerCase();

            if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
                aiResponseText = 'Hello Jane! How can I assist you with your learning today?';
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

            if (chatHistoryRef.current) {
                chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
            }
        }, 1500);
    };


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

    const currentCourseDetail = courses.find(c => c.id === selectedCourseId);

    // Display a loading state while checking for user session
    if (isLoadingUser) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                <i className="fas fa-spinner fa-spin text-6xl mb-4 text-blue-500"></i>
                <h2 className="text-2xl font-bold">Loading user session...</h2>
            </div>
        );
    }

    return (
        <div className={`min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col custom-scrollbar ${isDarkMode ? 'dark' : ''}`}>
            <Header
                setIsSidebarCollapsed={setIsSidebarCollapsed}
                isSidebarCollapsed={isSidebarCollapsed}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                setIsNotificationModalOpen={setIsNotificationModalOpen}
                isNotificationModalOpen={isNotificationModalOpen}
                setIsChatModalOpen={setIsChatModalOpen}
                isChatModalOpen={isChatModalOpen}
                handleSectionChange={handleSectionChange}
                profileAreaRef={profileAreaRef}
                profileDropdownRef={profileDropdownRef}
                isProfileDropdownOpen={isProfileDropdownOpen}
                setIsProfileDropdownOpen={setIsProfileDropdownOpen}
                notificationButtonRef={notificationButtonRef}
                chatAiButtonRef={chatAiButtonRef}
                user={user}
                handleSignOut={handleSignOut}
                setIsLoginModalOpen={setIsLoginModalOpen}
                signInButtonRef={signInButtonRef}
                profileData={profileData}
            />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar
                    isSidebarCollapsed={isSidebarCollapsed}
                    activeSection={activeSection}
                    handleSectionChange={handleSectionChange}
                    user={user}
                />

                <main ref={mainContentAreaRef} id="main-content-area" className="flex-1 p-6 overflow-y-auto custom-scrollbar" role="main" aria-live="polite" tabIndex="-1">
                    {user ? (
                        (() => {
                            switch (activeSection) {
                                case 'dashboard-content':
                                    return (
                                        <Dashboard
                                            currentAIFocus={currentAIFocus}
                                            updateAIFocus={updateAIFocus}
                                            currentRecommendations={currentRecommendations}
                                            renderRecommendations={renderRecommendations}
                                        />
                                    );
                                case 'my-courses-content':
                                    return (
                                        <MyCourses
                                            courses={courses}
                                            handleSectionChange={handleSectionChange}
                                        />
                                    );
                                case 'course-detail-content':
                                    return (
                                        <CourseDetail
                                            currentCourseDetail={currentCourseDetail}
                                            handleSectionChange={handleSectionChange}
                                        />
                                    );
                                case 'quizzes-content':
                                    return (
                                        <QuizzesContent
                                            quizId={selectedQuizId}
                                            handleSectionChange={handleSectionChange}
                                        />
                                    );
                                case 'progress-content':
                                    return <ProgressContent />;
                                case 'explore-content':
                                    return <ExploreContent />;
                                case 'settings-content':
                                    return (
                                        <SettingsContent
                                            isDarkMode={isDarkMode}
                                            setIsDarkMode={setIsDarkMode}
                                            profileData={profileData}
                                            setProfileData={setProfileData}
                                        />
                                    );
                                case 'support-content':
                                    return <SupportContent />;
                                case 'profile-settings-content':
                                    return <ProfileSettingsContent profileData={profileData} />;
                                case 'account-settings-content':
                                    return <AccountSettingsContent />;
                                default:
                                    return null;
                            }
                        })()
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-700 dark:text-gray-300">
                            <i className="fas fa-user-lock text-6xl mb-4 text-blue-500"></i>
                            <h2 className="text-2xl font-bold mb-2">Please Sign In to Access the Dashboard</h2>
                            <p className="text-lg mb-4">Unlock personalized learning and track your progress.</p>
                            <button
                                onClick={() => setIsLoginModalOpen(true)}
                                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 text-lg"
                            >
                                Sign In
                            </button>
                        </div>
                    )}
                </main>
            </div>

            {/* NEW: Copyright Footer Section */}
            <footer className="w-full py-4 text-center text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
                <p>&copy; {new Date().getFullYear()} Faiz Ansari. All rights reserved. This site is currently under development.</p>
            </footer>

            <AIChatModal
                isChatModalOpen={isChatModalOpen}
                setIsChatModalOpen={setIsChatModalOpen}
                chatMessages={chatMessages}
                chatInput={chatInput}
                setChatInput={setChatInput}
                handleSendChat={handleSendChat}
                chatLoading={chatLoading}
                chatHistoryRef={chatHistoryRef}
                chatAiButtonRef={chatAiButtonRef}
            />

            <NotificationModal
                isNotificationModalOpen={isNotificationModalOpen}
                setIsNotificationModalOpen={setIsNotificationModalOpen}
                notificationButtonRef={notificationButtonRef}
            />

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => { setIsLoginModalOpen(false); signInButtonRef.current?.focus(); }}
                onSignIn={handleSignIn}
                onSignUp={handleSignUp}
            />
        </div>
    );
};

export default App;
