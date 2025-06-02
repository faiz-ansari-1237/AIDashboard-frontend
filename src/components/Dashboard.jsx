// src/components/Dashboard.jsx
import React from 'react';
import courses from '../data/courses'; // Import courses data

const Dashboard = ({ currentAIFocus, updateAIFocus, currentRecommendations, renderRecommendations }) => {

    // Find the most recently accessed course
    const recentlyAccessedCourse = courses
        .filter(course => course.lastAccessed) // Only courses that have been accessed
        .sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed))[0]; // Sort by most recent

    // Calculate simple learning statistics (mock data for now)
    const completedCourses = courses.filter(course => course.progress === 100).length;
    const totalCourses = courses.length; // Added for context, though not directly used in current display
    const totalHoursLearned = courses.reduce((sum, course) => {
        // Assuming 1 hour per 10% progress for simplicity, this is just mock
        // This is a rough estimation; in a real app, you'd track actual time spent
        return sum + (course.progress / 100) * (parseInt(course.duration) || 0); // Ensure duration is parsed and fallback to 0
    }, 0);
    const learningStreak = 7; // Mock streak for demonstration

    return (
        <div className="space-y-8 pb-8">
            {/* AI Focus Section */}
            <section className="bg-white p-6 rounded-lg shadow-md ai-emphasized">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                    <i className="fas fa-brain text-blue-500 mr-3 text-2xl"></i> Your AI Focus
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{currentAIFocus}</p>
                <button
                    onClick={updateAIFocus}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                >
                    <i className="fas fa-sync-alt mr-2"></i> Get New Focus
                </button>
            </section>

            {/* Continue Learning Section */}
            {recentlyAccessedCourse && (
                <section className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Continue Learning</h2>
                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
                        {/* Image for the recently accessed course */}
                        <img src={recentlyAccessedCourse.image} alt={recentlyAccessedCourse.title} className="w-24 h-24 rounded-md object-cover flex-shrink-0" />
                        <div className="flex-grow">
                            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">{recentlyAccessedCourse.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{recentlyAccessedCourse.instructor}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full"
                                    style={{ width: `${recentlyAccessedCourse.progress}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{recentlyAccessedCourse.progress}% Complete</p>
                            <button
                                onClick={() => alert(`Navigating to ${recentlyAccessedCourse.title}`)} // Placeholder for actual navigation
                                className="mt-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5 px-3 rounded-lg text-sm transition duration-300"
                            >
                                <i className="fas fa-play-circle mr-2"></i> Continue Learning
                            </button>
                        </div>
                    </div>
                </section>
            )}


            {/* Your Learning Statistics Section */}
            <section className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-lg shadow-md text-gray-900 dark:text-gray-100">
                <h2 className="text-xl font-semibold mb-4">Your Learning Stats</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm text-center">
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 flex items-center justify-center">
                            <i className="fas fa-graduation-cap text-4xl mr-2"></i> {completedCourses}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">Courses Completed</p>
                    </div>
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm text-center">
                        <p className="text-3xl font-bold text-green-600 dark:text-green-400 flex items-center justify-center">
                            <i className="fas fa-clock text-4xl mr-2"></i> {totalHoursLearned.toFixed(1)}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">Hours Learned</p>
                    </div>
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm text-center">
                        <p className="text-3xl font-bold text-yellow-500 dark:text-yellow-300 flex items-center justify-center">
                            <i className="fas fa-fire text-4xl mr-2"></i> {learningStreak} Days
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">Learning Streak</p>
                    </div>
                </div>
            </section>

            {/* AI Recommendations Section */}
            <section className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">AI Recommendations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentRecommendations.map(rec => (
                        <div key={rec.id} className="border border-gray-200 rounded-lg overflow-hidden transition-shadow hover:shadow-lg dark:border-gray-700">
                            {/* Image for each recommendation */}
                            <img src={rec.thumbnail} alt={rec.title} className="w-full h-32 object-cover" />
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-800 dark:text-gray-200">{rec.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{rec.description}</p>
                                <span className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full dark:bg-gray-700 dark:text-gray-300">{rec.type}</span>
                                <button
                                    onClick={() => alert(`Enrolling in ${rec.title}`)} // Placeholder for actual enrollment
                                    className="mt-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5 px-3 rounded-lg text-sm transition duration-300"
                                >
                                    <i className="fas fa-eye mr-2"></i> View Content
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={renderRecommendations}
                    className="mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                >
                    <i className="fas fa-sync-alt mr-2"></i> Refresh Recommendations
                </button>
            </section>
        </div>
    );
};

export default Dashboard;
