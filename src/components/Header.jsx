import React from 'react';

/**
 * Header Component: Displays the top navigation bar with menu toggle, search,
 * notifications, AI chat, theme toggle, and user profile/sign-in.
 * @param {object} props - Component props.
 * @param {function} props.setIsSidebarCollapsed - Function to toggle sidebar collapse state.
 * @param {boolean} props.isSidebarCollapsed - Current state of sidebar collapse.
 * @param {boolean} props.isDarkMode - Current theme mode (dark/light).
 * @param {function} props.setIsDarkMode - Function to toggle theme mode.
 * @param {function} props.setIsNotificationModalOpen - Function to open notification modal.
 * @param {boolean} props.isNotificationModalOpen - Current state of notification modal visibility.
 * @param {function} props.setIsChatModalOpen - Function to open AI chat modal.
 * @param {boolean} props.isChatModalOpen - Current state of AI chat modal visibility.
 * @param {function} props.handleSectionChange - Function to navigate between sections.
 * @param {React.RefObject} props.profileAreaRef - Ref for the profile area for dropdown positioning.
 * @param {React.RefObject} props.profileDropdownRef - Ref for the profile dropdown for click outside detection.
 * @param {boolean} props.isProfileDropdownOpen - State of profile dropdown visibility.
 * @param {function} props.setIsProfileDropdownOpen - Function to toggle profile dropdown.
 * @param {React.RefObject} props.notificationButtonRef - Ref for notification button for focus management.
 * @param {React.RefObject} props.chatAiButtonRef - Ref for chat AI button for focus management.
 * @param {object|null} props.user - Current user object (null if logged out).
 * @param {function} props.handleSignOut - Function to handle user sign-out.
 * @param {function} props.setIsLoginModalOpen - Function to open the login modal.
 * @param {React.RefObject} props.signInButtonRef - Ref for the Sign In button for focus management.
 * @param {object} props.profileData - User profile data for display.
 */
const Header = ({
    setIsSidebarCollapsed,
    isSidebarCollapsed,
    isDarkMode,
    setIsDarkMode,
    setIsNotificationModalOpen,
    isNotificationModalOpen,
    setIsChatModalOpen,
    isChatModalOpen,
    handleSectionChange,
    profileAreaRef,
    profileDropdownRef,
    isProfileDropdownOpen,
    setIsProfileDropdownOpen,
    notificationButtonRef,
    chatAiButtonRef,
    user, // NEW
    handleSignOut, // NEW
    setIsLoginModalOpen, // NEW
    signInButtonRef, // NEW
    profileData // NEW
}) => {
    return (
        <header className="flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-20 rounded-b-lg dark:bg-gray-900 dark:text-gray-100">
            <div className="flex items-center">
                <button
                    id="menu-toggle"
                    className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:hover:bg-gray-700"
                    aria-label="Toggle sidebar"
                    onClick={() => setIsSidebarCollapsed(prev => !prev)}
                    aria-expanded={!isSidebarCollapsed}
                >
                    <i className="fas fa-bars text-xl"></i>
                </button>
                <div className="ml-4 text-xl font-bold text-blue-600 dark:text-blue-400">AI Dashboard</div>
            </div>

            <div className="flex-1 max-w-lg mx-4 hidden md:flex">
                <input
                    type="text"
                    id="search-input"
                    placeholder="Search resources, topics, or insights..."
                    className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    aria-label="Search input"
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            console.log(`Simulating search for: "${e.target.value}"`);
                            e.target.blur();
                        }
                    }}
                />
            </div>

            <div className="flex items-center space-x-4 relative">
                <button
                    ref={notificationButtonRef}
                    id="notification-button"
                    className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:hover:bg-gray-700"
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
                    className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:hover:bg-gray-700"
                    aria-label="AI Tutor"
                    aria-haspopup="true"
                    aria-expanded={isChatModalOpen}
                    onClick={() => setIsChatModalOpen(true)}
                >
                    <i className="fas fa-robot text-lg"></i>
                </button>
                <button
                    id="theme-toggle"
                    className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:hover:bg-gray-700"
                    aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    onClick={() => setIsDarkMode(!isDarkMode)}
                >
                    <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'} text-lg`} id="theme-icon"></i>
                </button>

                {user ? ( // Conditionally render profile area if logged in
                    <div
                        ref={profileAreaRef}
                        id="profile-area"
                        className="relative flex items-center space-x-2 cursor-pointer"
                        aria-haspopup="true"
                        aria-expanded={isProfileDropdownOpen}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsProfileDropdownOpen(prev => !prev);
                        }}
                    >
                        <img
                            id="profile-avatar"
                            src={user.avatar || "https://placehold.co/36x36/60A5FA/FFFFFF?text=JP"}
                            alt="User Avatar"
                            className="w-9 h-9 rounded-full object-cover border-2 border-blue-400"
                            aria-label="User profile image"
                        />
                        <span id="profile-name" className="font-medium hidden sm:block text-gray-800 dark:text-gray-200">{profileData.name}</span>
                        {isProfileDropdownOpen && (
                            <div ref={profileDropdownRef} id="profile-dropdown" className="dropdown-menu">
                                <ul className="py-1" role="menu" aria-orientation="vertical">
                                    <li><a href="#profile-settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700" role="menuitem" onClick={() => { handleSectionChange('profile-settings-content'); setIsProfileDropdownOpen(false); }}>View Profile</a></li>
                                    <li><a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700" role="menuitem" onClick={() => { handleSectionChange('settings-content'); setIsProfileDropdownOpen(false); }}>Account Settings</a></li>
                                    <li><a href="#" id="sign-out-link" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700" role="menuitem" onClick={handleSignOut}>Sign Out</a></li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : ( // Render Sign In button if not logged in
                    <button
                        ref={signInButtonRef}
                        id="sign-in-button"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                        aria-label="Sign In"
                        onClick={() => setIsLoginModalOpen(true)}
                    >
                        Sign In
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
