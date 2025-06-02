import React from 'react';

/**
 * Sidebar Component: Displays the main navigation links and a promo section.
 * It collapses/expands based on `isSidebarCollapsed` prop.
 * @param {object} props - Component props.
 * @param {boolean} props.isSidebarCollapsed - Current state of sidebar collapse.
 * @param {string} props.activeSection - ID of the currently active content section.
 * @param {function} props.handleSectionChange - Function to navigate between sections.
 * @param {object|null} props.user - Current user object (null if logged out).
 */
const Sidebar = ({ isSidebarCollapsed, activeSection, handleSectionChange, user }) => {
    // Hide sidebar if user is not logged in
    if (!user) {
        return null;
    }

    return (
        <aside id="sidebar" className={`sidebar-panel bg-white border-r border-gray-200 p-4 flex-shrink-0 w-64 md:w-60 custom-scrollbar overflow-y-auto dark:bg-gray-800 dark:border-gray-700 ${isSidebarCollapsed ? 'collapsed' : ''}`}>
            <nav className="space-y-2" role="navigation">
                {/* Dashboard Link */}
                <a
                    href="#dashboard"
                    className={`sidebar-link flex items-center p-3 rounded-lg hover:bg-gray-100 font-medium ${activeSection === 'dashboard-content' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
                    aria-current={activeSection === 'dashboard-content' ? 'page' : undefined}
                    onClick={() => handleSectionChange('dashboard-content')}
                >
                    <i className="fas fa-chart-line mr-4 text-xl"></i>
                    <span>AI Dashboard</span>
                </a>
                {/* My Courses Link */}
                <a
                    href="#my-courses"
                    className={`sidebar-link flex items-center p-3 rounded-lg hover:bg-gray-100 ${activeSection === 'my-courses-content' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
                    aria-current={activeSection === 'my-courses-content' ? 'page' : undefined}
                    onClick={() => handleSectionChange('my-courses-content')}
                >
                    <i className="fas fa-book-open mr-4 text-xl"></i>
                    <span>My Courses</span>
                </a>
                {/* Progress Link */}
                <a
                    href="#progress"
                    className={`sidebar-link flex items-center p-3 rounded-lg hover:bg-gray-100 ${activeSection === 'progress-content' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
                    aria-current={activeSection === 'progress-content' ? 'page' : undefined}
                    onClick={() => handleSectionChange('progress-content')}
                >
                    <i className="fas fa-trophy mr-4 text-xl"></i>
                    <span>Progress</span>
                </a>
                {/* Quizzes Link */}
                <a
                    href="#quizzes"
                    className={`sidebar-link flex items-center p-3 rounded-lg hover:bg-gray-100 ${activeSection === 'quizzes-content' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
                    aria-current={activeSection === 'quizzes-content' ? 'page' : undefined}
                    onClick={() => handleSectionChange('quizzes-content')}
                >
                    <i className="fas fa-question-circle mr-4 text-xl"></i>
                    <span>Quizzes & Assessments</span>
                </a>
                {/* Explore Link */}
                <a
                    href="#explore"
                    className={`sidebar-link flex items-center p-3 rounded-lg hover:bg-gray-100 ${activeSection === 'explore-content' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
                    aria-current={activeSection === 'explore-content' ? 'page' : undefined}
                    onClick={() => handleSectionChange('explore-content')}
                >
                    <i className="fas fa-compass mr-4 text-xl"></i>
                    <span>Explore New Content</span>
                </a>
            </nav>
            <hr className="my-6 border-gray-200 dark:border-gray-700" />
            <div className="space-y-2">
                {/* Settings Link */}
                <a
                    href="#settings"
                    className={`sidebar-link flex items-center p-3 rounded-lg hover:bg-gray-100 ${activeSection === 'settings-content' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
                    aria-current={activeSection === 'settings-content' ? 'page' : undefined}
                    onClick={() => handleSectionChange('settings-content')}
                >
                    <i className="fas fa-cog mr-4 text-xl"></i>
                    <span>Settings</span>
                </a>
                {/* Support Link */}
                <a
                    href="#support"
                    className={`sidebar-link flex items-center p-3 rounded-lg hover:bg-gray-100 ${activeSection === 'support-content' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
                    aria-current={activeSection === 'support-content' ? 'page' : undefined}
                    onClick={() => handleSectionChange('support-content')}
                >
                    <i className="fas fa-life-ring mr-4 text-xl"></i>
                    <span>Support & Help</span>
                </a>
            </div>
            {/* Sidebar Promo Box */}
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg shadow-inner text-gray-800 sidebar-promo dark:from-gray-700 dark:to-gray-800 dark:text-gray-200">
                <p className="text-sm font-semibold mb-2">Boost your learning!</p>
                <p className="text-xs mb-3">Upgrade to Premium for exclusive content and AI coaching.</p>
                <button className="w-full bg-blue-500 text-white text-sm py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">Upgrade Now</button>
            </div>
        </aside>
    );
};

export default Sidebar;
