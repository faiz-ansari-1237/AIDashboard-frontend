import React from 'react';

/**
 * Explore Content Component: Placeholder for discovering new learning content.
 */
const ExploreContent = () => (
    <section id="explore-content" className="content-section" tabIndex="-1">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Explore New Content</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 dark:text-gray-100">Generative AI Workshop</h3>
                <p className="text-gray-700 text-sm mb-3 dark:text-gray-300">Discover the latest in AI content generation and practical applications.</p>
                <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600">Enroll</button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 dark:text-gray-100">Cybersecurity Basics</h3>
                <p className="text-gray-700 text-sm mb-3 dark:text-gray-300">Essential knowledge for online safety and protecting your digital footprint.</p>
                <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600">Enroll</button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 dark:text-gray-100">Data Visualization with D3.js</h3>
                <p className="text-gray-700 text-sm mb-3 dark:text-gray-300">Learn to create stunning interactive data visualizations for the web.</p>
                <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600">Explore</button>
            </div>
        </div>
    </section>
);

export default ExploreContent;
