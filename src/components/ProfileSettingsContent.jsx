import React from 'react';

/**
 * Profile Settings Content Component: Displays user profile information.
 * @param {object} props - Component props.
 * @param {object} props.profileData - User profile data.
 */
const ProfileSettingsContent = ({ profileData }) => {
    return (
        <section id="profile-settings-content" className="content-section" tabIndex="-1">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">View Profile</h1>
            <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex flex-col items-center mb-6">
                    <img src="https://placehold.co/100x100/60A5FA/FFFFFF?text=JP" alt="User Avatar" className="w-24 h-24 rounded-full object-cover border-4 border-blue-400 mb-4" />
                    <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">Change Profile Picture</button>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username:</label>
                    <p className="text-lg text-gray-800 dark:text-gray-100">{profileData.name}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email:</label>
                    <p className="text-lg text-gray-800 dark:text-gray-100">{profileData.email}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Learning Path:</label>
                    <p className="text-lg text-gray-800 dark:text-gray-100">{profileData.learningPath}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Member Since:</label>
                    <p className="text-lg text-gray-800 dark:text-gray-100">{profileData.memberSince}</p>
                </div>
                {/* Button to navigate to settings for editing */}
                <button
                    onClick={() => alert('Navigate to settings for editing')} // Placeholder for navigation
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Edit Profile
                </button>
            </div>
        </section>
    );
};

export default ProfileSettingsContent;
