// src/components/MyCourses.jsx
import React from 'react';

/**
 * My Courses Content Component: Displays a list of courses the user is enrolled in.
 * Each course card allows navigation to its detail page.
 * @param {object} props - Component props.
 * @param {Array<object>} props.courses - List of course objects.
 * @param {function} props.handleSectionChange - Function to navigate between sections.
 */
const MyCourses = ({ courses, handleSectionChange }) => {
    return (
        <section id="my-courses-content" className="content-section" tabIndex="-1">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">My Courses</h1>
            <div id="my-courses-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                    <div
                        key={course.id}
                        className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 cursor-pointer course-card"
                        data-course-id={course.id}
                        tabIndex="0" // Make div focusable for keyboard navigation
                        role="link" // Indicate it acts as a link
                        aria-label={`View course: ${course.title}`}
                        onClick={() => handleSectionChange(`course-${course.id}`, course.id)}
                        onKeyPress={(e) => {
                            // Allow navigation with Enter or Space key for accessibility
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleSectionChange(`course-${course.id}`, course.id);
                            }
                        }}
                    >
                        {/* Use course.image for the thumbnail */}
                        <img src={course.image} alt={`Thumbnail for ${course.title}`} className="w-full h-32 object-cover rounded-md mb-3" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2 dark:text-gray-100">{course.title}</h3>
                        <p className="text-gray-700 text-sm mb-3 line-clamp-2 dark:text-gray-300">{course.description}</p>
                        <p className="text-gray-700 text-sm mb-3 dark:text-gray-300">Progress: {course.progress}%</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-4" role="progressbar" aria-valuenow={course.progress} aria-valuemin="0" aria-valuemax="100">
                            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                        </div>
                        <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600">Continue Learning</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MyCourses;
