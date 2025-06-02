import React from 'react';

/**
 * AI Chat Modal Component: Provides an interactive chat interface with an AI tutor.
 * @param {object} props - Component props.
 * @param {boolean} props.isChatModalOpen - State of chat modal visibility.
 * @param {function} props.setIsChatModalOpen - Function to close chat modal.
 * @param {Array<object>} props.chatMessages - List of chat messages.
 * @param {string} props.chatInput - Current value of the chat input field.
 * @param {function} props.setChatInput - Function to update chat input value.
 * @param {function} props.handleSendChat - Function to send a chat message.
 * @param {boolean} props.chatLoading - Indicates if AI is currently typing a response.
 * @param {React.RefObject} props.chatHistoryRef - Ref for the chat history div for scrolling.
 * @param {React.RefObject} props.chatAiButtonRef - Ref for the AI chat button for focus management.
 */
const AIChatModal = ({ isChatModalOpen, setIsChatModalOpen, chatMessages, chatInput, setChatInput, handleSendChat, chatLoading, chatHistoryRef, chatAiButtonRef }) => {
    // Render nothing if the modal is not open
    if (!isChatModalOpen) return null;

    return (
        <div id="ai-chat-modal" className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="chat-modal-title">
            <div className="modal-content">
                <div className="flex justify-between items-center mb-4">
                    <h2 id="chat-modal-title" className="text-xl font-bold text-gray-900 dark:text-white">Chat with AI Tutor <i className="fas fa-robot ml-2 text-blue-500"></i></h2>
                    <button
                        id="close-chat-modal"
                        className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:hover:bg-gray-700"
                        aria-label="Close chat modal"
                        onClick={() => { setIsChatModalOpen(false); chatAiButtonRef.current?.focus(); }} // Return focus to the button that opened the modal
                    >
                        <i className="fas fa-times text-lg"></i>
                    </button>
                </div>
                <div ref={chatHistoryRef} id="chat-history" className="h-64 overflow-y-auto custom-scrollbar p-3 mb-4 border border-gray-200 rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600" tabIndex="0" aria-live="polite" aria-atomic="true">
                    {/* Display chat messages */}
                    {chatMessages.map((message, index) => (
                        <div key={index} className={`${message.sender === 'You' ? 'text-right text-gray-800 dark:text-gray-200' : 'text-gray-700 dark:text-gray-300'} mb-2`}>
                            <span className={`font-semibold ${message.sender === 'You' ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>{message.sender}:</span> {message.text}
                        </div>
                    ))}
                </div>
                <div className="flex">
                    <input
                        type="text"
                        id="chat-input"
                        placeholder="Ask your AI tutor a question..."
                        className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        aria-label="Chat input"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) => { if (e.key === 'Enter') handleSendChat(); }}
                    />
                    <button
                        id="send-chat-button"
                        className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Send message"
                        onClick={handleSendChat}
                    >
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
                {/* Loading indicator when AI is typing */}
                {chatLoading && (
                    <p id="chat-loading-indicator" className="text-center text-sm text-gray-600 mt-2 dark:text-gray-400" aria-live="polite">AI Tutor is typing...</p>
                )}
            </div>
        </div>
    );
};

export default AIChatModal;
