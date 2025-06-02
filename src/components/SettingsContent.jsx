import React, { useState } from 'react';

/**
 * Settings Content Component: Provides various user settings including profile,
 * account, notifications, theme, and privacy.
 * @param {object} props - Component props.
 * @param {boolean} props.isDarkMode - Current theme mode (dark/light) from App.jsx.
 * @param {function} props.setIsDarkMode - Function to toggle theme mode from App.jsx.
 * @param {object} props.profileData - User profile data.
 * @param {function} props.setProfileData - Function to update user profile data.
 */
const SettingsContent = ({ isDarkMode, setIsDarkMode, profileData, setProfileData }) => {
    // State for form fields, initialized from profileData prop
    const [username, setUsername] = useState(profileData.name);
    const [email, setEmail] = useState(profileData.email);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [inAppNotifications, setInAppNotifications] = useState(true);
    const [dataSharing, setDataSharing] = useState(true);
    const [activityTracking, setActivityTracking] = useState(true);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    // State for messages/feedback
    const [profileMessage, setProfileMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [privacyMessage, setPrivacyMessage] = useState('');

    const handleProfileSave = () => {
        // Update profileData in App.jsx (which also persists to localStorage)
        setProfileData(prev => ({ ...prev, name: username, email: email }));
        setProfileMessage('Profile changes saved successfully!');
        setTimeout(() => setProfileMessage(''), 3000);
    };

    const handleChangePassword = () => {
        if (newPassword !== confirmNewPassword) {
            setPasswordMessage('New passwords do not match!');
            return;
        }
        // Simulate password change - in a real app, you'd send to backend
        console.log('Changing password for:', username);
        setPasswordMessage('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setTimeout(() => setPasswordMessage(''), 3000);
    };

    const handlePrivacySave = () => {
        // Simulate saving privacy settings
        console.log('Saving privacy settings:', { dataSharing, activityTracking });
        setPrivacyMessage('Privacy settings updated!');
        setTimeout(() => setPrivacyMessage(''), 3000);
    };

    const handleDeleteAccount = () => {
        // In a real app, this would trigger a confirmation modal and backend deletion
        console.log('Attempting to delete account for:', username);
        alert('Account deletion initiated. This action cannot be undone.'); // Using alert for simplicity as per instructions, replace with modal
    };

    return (
        <section id="settings-content" className="content-section" tabIndex="-1" aria-labelledby="settings-heading">
            <h1 id="settings-heading" className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Settings</h1>

            {/* Profile Information */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 dark:bg-gray-800">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-gray-100 flex items-center">
                    <i className="fas fa-user-circle mr-3 text-blue-500"></i> Profile Information
                </h2>
                <div className="mb-4">
                    <label htmlFor="username-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                    <input
                        type="text"
                        id="username-input"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        aria-label="Username"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input
                        type="email"
                        id="email-input"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-label="Email address"
                    />
                </div>
                <button
                    onClick={handleProfileSave}
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                >
                    Save Profile
                </button>
                {profileMessage && <p className="text-sm text-green-600 mt-2" role="status" aria-live="polite">{profileMessage}</p>}
            </div>

            {/* Password Settings */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 dark:bg-gray-800">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-gray-100 flex items-center">
                    <i className="fas fa-lock mr-3 text-purple-500"></i> Password
                </h2>
                <div className="mb-4">
                    <label htmlFor="current-password-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                    <input
                        type="password"
                        id="current-password-input"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        aria-label="Current password"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="new-password-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                    <input
                        type="password"
                        id="new-password-input"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        aria-label="New password"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="confirm-password-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                    <input
                        type="password"
                        id="confirm-password-input"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        aria-label="Confirm new password"
                    />
                </div>
                <button
                    onClick={handleChangePassword}
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                >
                    Change Password
                </button>
                {passwordMessage && <p className={`text-sm mt-2 ${passwordMessage.includes('match') ? 'text-red-600' : 'text-green-600'}`} role="status" aria-live="polite">{passwordMessage}</p>}
            </div>

            {/* Notification Settings */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 dark:bg-gray-800">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-gray-100 flex items-center">
                    <i className="fas fa-bell mr-3 text-yellow-500"></i> Notification Settings
                </h2>
                <div className="flex items-center justify-between mb-4">
                    <label htmlFor="email-notifications-toggle" className="text-gray-700 dark:text-gray-300">Email Notifications</label>
                    <input
                        type="checkbox"
                        id="email-notifications-toggle"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded"
                        checked={emailNotifications}
                        onChange={(e) => setEmailNotifications(e.target.checked)}
                        aria-label="Toggle email notifications"
                    />
                </div>
                <div className="flex items-center justify-between mb-4">
                    <label htmlFor="in-app-notifications-toggle" className="text-gray-700 dark:text-gray-300">In-App Notifications</label>
                    <input
                        type="checkbox"
                        id="in-app-notifications-toggle"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded"
                        checked={inAppNotifications}
                        onChange={(e) => setInAppNotifications(e.target.checked)}
                        aria-label="Toggle in-app notifications"
                    />
                </div>
            </div>

            {/* Theme Settings */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 dark:bg-gray-800">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-gray-100 flex items-center">
                    <i className="fas fa-palette mr-3 text-green-500"></i> Display Theme
                </h2>
                <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-700 dark:text-gray-300">Theme</span>
                    <div className="flex items-center space-x-4">
                        <label htmlFor="theme-light" className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                id="theme-light"
                                name="theme"
                                className="form-radio h-4 w-4 text-blue-600"
                                value="light"
                                checked={!isDarkMode}
                                onChange={() => setIsDarkMode(false)}
                                aria-label="Select light theme"
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-300">Light</span>
                        </label>
                        <label htmlFor="theme-dark" className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                id="theme-dark"
                                name="theme"
                                className="form-radio h-4 w-4 text-blue-600"
                                value="dark"
                                checked={isDarkMode}
                                onChange={() => setIsDarkMode(true)}
                                aria-label="Select dark theme"
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-300">Dark</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 dark:bg-gray-800">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-gray-100 flex items-center">
                    <i className="fas fa-shield-alt mr-3 text-teal-500"></i> Privacy Controls
                </h2>
                <div className="flex items-center justify-between mb-4">
                    <label htmlFor="data-sharing-toggle" className="text-gray-700 dark:text-gray-300">Share Anonymized Data</label>
                    <input
                        type="checkbox"
                        id="data-sharing-toggle"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded"
                        checked={dataSharing}
                        onChange={(e) => setDataSharing(e.target.checked)}
                        aria-label="Toggle sharing of anonymized data"
                    />
                </div>
                <div className="flex items-center justify-between mb-4">
                    <label htmlFor="activity-tracking-toggle" className="text-gray-700 dark:text-gray-300">Track Learning Activity</label>
                    <input
                        type="checkbox"
                        id="activity-tracking-toggle"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded"
                        checked={activityTracking}
                        onChange={(e) => setActivityTracking(e.target.checked)}
                        aria-label="Toggle tracking of learning activity"
                    />
                </div>
                <button
                    onClick={handlePrivacySave}
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                >
                    Save Privacy Settings
                </button>
                {privacyMessage && <p className="text-sm text-green-600 mt-2" role="status" aria-live="polite">{privacyMessage}</p>}
            </div>

            {/* Danger Zone */}
            <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-gray-100 flex items-center">
                    <i className="fas fa-exclamation-triangle mr-3 text-red-500"></i> Danger Zone
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Proceed with caution. These actions are irreversible.
                </p>
                <button
                    onClick={handleDeleteAccount}
                    className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                    aria-label="Delete your account permanently"
                >
                    Delete Account
                </button>
            </div>
        </section>
    );
};

export default SettingsContent;
