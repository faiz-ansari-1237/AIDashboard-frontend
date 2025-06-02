import React from 'react';

/**
 * Account Settings Content Component: Placeholder for account security and privacy settings.
 */
const AccountSettingsContent = () => {
    return (
        <section id="account-settings-content" className="content-section" tabIndex="-1">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Account Settings</h1>
            <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 dark:text-gray-100">Security</h3>
                <div className="mb-4">
                    <label htmlFor="current-password-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                    <input type="password" id="current-password-input" className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600" aria-label="Current Password" />
                </div>
                <div className="mb-4">
                    <label htmlFor="new-password-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                    <input type="password" id="new-password-input" className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600" aria-label="New Password" />
                </div>
                <div className="mb-4">
                    <label htmlFor="confirm-password-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                    <input type="password" id="confirm-password-input" className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600" aria-label="Confirm New Password" />
                </div>
                <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Update Password</button>

                <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4 dark:text-gray-100">Privacy Controls</h3>
                <div className="flex items-center justify-between mb-4">
                    <label htmlFor="data-sharing-toggle" className="text-gray-700 dark:text-gray-300">Share Anonymized Data</label>
                    <input type="checkbox" id="data-sharing-toggle" className="form-checkbox h-5 w-5 text-blue-600 rounded" aria-label="Share Anonymized Data" defaultChecked />
                </div>
                <div className="flex items-center justify-between mb-4">
                    <label htmlFor="activity-tracking-toggle" className="text-gray-700 dark:text-gray-300">Track Learning Activity</label>
                    <input type="checkbox" id="activity-tracking-toggle" className="form-checkbox h-5 w-5 text-blue-600 rounded" aria-label="Track Learning Activity" defaultChecked />
                </div>
                <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Save Privacy Settings</button>

                <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4 dark:text-gray-100">Danger Zone</h3>
                <button className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Delete Account</button>
            </div>
        </section>
    );
};

export default AccountSettingsContent;
