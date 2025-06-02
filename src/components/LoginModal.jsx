import React, { useState, useEffect, useRef } from 'react';

/**
 * Login Modal Component: Provides a form for user sign-in and sign-up.
 * It communicates with the backend via props.onSignIn and props.onSignUp.
 * @param {object} props - Component props.
 * @param {boolean} props.isOpen - Controls the visibility of the modal.
 * @param {function} props.onClose - Function to close the modal.
 * @param {function} props.onSignIn - Function to handle sign-in logic (passed from App.jsx, now async).
 * @param {function} props.onSignUp - Function to handle sign-up logic (passed from App.jsx, now async).
 */
const LoginModal = ({ isOpen, onClose, onSignIn, onSignUp }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false); // State to toggle between sign-in and sign-up forms
    const [message, setMessage] = useState(''); // For displaying signup/signin messages (success/error)
    const [loading, setLoading] = useState(false); // For showing a loading indicator during API calls
    const modalRef = useRef(null);
    const initialFocusRef = useRef(null); // Ref for the first focusable element in the form

    // Effect to manage focus and keyboard navigation (Tab trapping) when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            // Set focus to the first input field when modal opens
            initialFocusRef.current?.focus();
            // Add event listener for keyboard navigation (Tab trapping)
            const handleKeyDown = (event) => {
                if (event.key === 'Tab' && modalRef.current) {
                    const focusableElements = modalRef.current.querySelectorAll(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];

                    if (event.shiftKey) { // Shift + Tab
                        if (document.activeElement === firstElement) {
                            lastElement.focus();
                            event.preventDefault();
                        }
                    } else { // Tab
                        if (document.activeElement === lastElement) {
                            firstElement.focus();
                            event.preventDefault();
                        }
                    }
                } else if (event.key === 'Escape') {
                    onClose(); // Allow escape key to close modal
                }
            };
            document.addEventListener('keydown', handleKeyDown);
            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [isOpen, onClose]); // Dependencies: re-run if modal opens/closes or onClose changes

    // Clear messages and loading state when switching between sign-in/sign-up forms
    useEffect(() => {
        setMessage('');
        setLoading(false);
    }, [isSignUp]); // Dependency: re-run if isSignUp state changes

    // Render nothing if the modal is not open
    if (!isOpen) return null;

    /**
     * Handles form submission for both sign-up and sign-in.
     * Calls the appropriate async function passed via props (onSignUp or onSignIn).
     * Displays messages based on the backend's response.
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior (page reload)
        setMessage(''); // Clear any previous messages
        setLoading(true); // Show loading indicator

        let result;
        if (isSignUp) {
            // Call the onSignUp function (which makes the API call to the backend)
            result = await onSignUp(username, password);
            if (result.success) {
                setMessage(result.message + ' Please sign in with your new account.'); // Display success message
                setIsSignUp(false); // Automatically switch to sign-in form after successful signup
                setUsername(''); // Clear username field
                setPassword(''); // Clear password field
            } else {
                setMessage(result.message); // Display error message from backend
            }
        } else {
            // Call the onSignIn function (which makes the API call to the backend)
            result = await onSignIn(username, password);
            if (!result.success) {
                setMessage(result.message); // Display error message from backend
            } else {
                // Sign-in successful, App.jsx handles closing the modal and clearing fields
                setUsername('');
                setPassword('');
            }
        }
        setLoading(false); // Hide loading indicator after API call
    };

    return (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="login-modal-title">
            <div ref={modalRef} className="modal-content">
                <div className="flex justify-between items-center mb-4">
                    <h2 id="login-modal-title" className="text-2xl font-bold text-gray-900 dark:text-white">
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:hover:bg-gray-700"
                        aria-label="Close modal"
                    >
                        <i className="fas fa-times text-lg"></i>
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="auth-username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                        <input
                            type="text"
                            id="auth-username"
                            ref={initialFocusRef} // Set ref for initial focus
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            aria-label="Username"
                            disabled={loading} // Disable input when loading
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="auth-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            id="auth-password"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            aria-label="Password"
                            disabled={loading} // Disable input when loading
                        />
                    </div>
                    {/* Display messages (success or error) */}
                    {message && (
                        <p className={`text-sm mb-4 ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
                            {message}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={loading} // Disable button when loading
                    >
                        {loading ? (
                            <i className="fas fa-spinner fa-spin mr-2"></i> // Loading spinner icon
                        ) : (
                            isSignUp ? 'Sign Up' : 'Sign In'
                        )}
                    </button>
                </form>
                <p className="text-center text-sm mt-4 text-gray-600 dark:text-gray-400">
                    {isSignUp ? (
                        <>
                            Already have an account?{' '}
                            <button
                                onClick={() => setIsSignUp(false)}
                                className="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300"
                                disabled={loading} // Disable button when loading
                            >
                                Sign In
                            </button>
                        </>
                    ) : (
                        <>
                            Don't have an account?{' '}
                            <button
                                onClick={() => setIsSignUp(true)}
                                className="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300"
                                disabled={loading} // Disable button when loading
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default LoginModal;
