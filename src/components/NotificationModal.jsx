import React from 'react';

/**
 * Notification Modal Component: Displays recent notifications to the user.
 * @param {object} props - Component props.
 * @param {boolean} props.isNotificationModalOpen - State of notification modal visibility.
 * @param {function} props.setIsNotificationModalOpen - Function to close notification modal.
 * @param {React.RefObject} props.notificationButtonRef - Ref for the notification button for focus management.
 */
const NotificationModal = ({ isNotificationModalOpen, setIsNotificationModalOpen, notificationButtonRef }) => {
    // Render nothing if the modal is not open
    if (!isNotificationModalOpen) return null;

    return (
        <div id="notification-modal" className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="notification-modal-title">
            <div className="modal-content">
                <div className="flex justify-between items-center mb-4">
                    <h2 id="notification-modal-title" className="text-xl font-bold text-gray-900 dark:text-white">Notifications <i className="fas fa-bell ml-2 text-yellow-500"></i></h2>
                    <button
                        id="close-notification-modal"
                        className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:hover:bg-gray-700"
                        aria-label="Close notifications"
                        onClick={() => { setIsNotificationModalOpen(false); notificationButtonRef.current?.focus(); }} // Return focus to the button that opened the modal
                    >
                        <i className="fas fa-times text-lg"></i>
                    </button>
                </div>
                <div className="h-64 overflow-y-auto custom-scrollbar p-3 border border-gray-200 rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600" tabIndex="0" aria-live="polite" aria-atomic="true">
                    <ul className="space-y-3">
                        <li className="p-3 bg-white rounded-md shadow-sm dark:bg-gray-800" role="alert">
                            <p className="font-semibold text-gray-800 dark:text-gray-100">New Quiz Available!</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">"Advanced JavaScript Concepts" quiz is now live.</p>
                            <span className="text-xs text-gray-500 dark:text-gray-500">2 hours ago</span>
                        </li>
                        <li className="p-3 bg-white rounded-md shadow-sm dark:bg-gray-800" role="alert">
                            <p className="font-semibold text-gray-800 dark:text-gray-100">Course Update</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">"Python for Data Science" received new practice problems.</p>
                            <span className="text-xs text-gray-500 dark:text-gray-500">1 day ago</span>
                        </li>
                        <li className="p-3 bg-white rounded-md shadow-sm dark:bg-gray-800" role="alert">
                            <p className="font-semibold text-gray-800 dark:text-gray-100">AI Focus Refreshed</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Your daily learning focus has been updated by the AI.</p>
                            <span className="text-xs text-gray-500 dark:text-gray-500">Today</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NotificationModal;
