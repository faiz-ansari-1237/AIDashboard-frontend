import React from 'react';

/**
 * Support Content Component: Placeholder for help and support options.
 */
const SupportContent = () => (
    <section id="support-content" className="content-section" tabIndex="-1">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Support & Help</h1>
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
            <p className="text-gray-700 mb-4 dark:text-gray-300">If you need help, please check our comprehensive FAQ section or contact our dedicated support team directly.</p>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-4">View FAQ</button>
            <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">Contact Support</button>
        </div>
    </section>
);

export default SupportContent;
