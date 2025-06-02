import React, { useState, useEffect } from 'react';

/**
 * QuizzesContent Component:
 * - If quizId is provided, displays a specific quiz with questions and submission.
 * - If no quizId, could theoretically list all quizzes (though current UI flow might not directly use this).
 * @param {object} props - Component props.
 * @param {string} [props.quizId] - The ID of the specific quiz to display.
 * @param {function} props.handleSectionChange - Function to navigate back to other sections.
 */
const QuizzesContent = ({ quizId, handleSectionChange }) => {
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({}); // Stores user's selected answers {questionId: answerText}
    const [submitted, setSubmitted] = useState(false); // Tracks if the quiz has been submitted
    const [submissionResult, setSubmissionResult] = useState(null); // Stores the backend's result
    const [isSubmitting, setIsSubmitting] = useState(false); // Tracks if submission is in progress

    const API_BASE_URL = 'https://aidashboard-backend.onrender.com/api/';

    // Helper function for authenticated fetches (copied from App.jsx for reusability)
    // In a larger app, you'd put this in a separate utility file.
    const authFetch = async (url, options = {}) => {
        const token = localStorage.getItem('token');
        const headers = {
            ...options.headers,
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, { ...options, headers });
        return response;
    };


    useEffect(() => {
        const fetchQuiz = async () => {
            if (!quizId) {
                // If no specific quiz ID, this component could display a list of all quizzes.
                // For now, it will just show a message.
                setLoading(false);
                setError("No quiz selected. Please select a quiz from a course.");
                setQuiz(null);
                return;
            }

            setLoading(true);
            setError(null);
            setSubmitted(false); // Reset submission state on new quiz load
            setSubmissionResult(null);
            setSelectedAnswers({});

            try {
                // Use authFetch for this request
                const response = await authFetch(`${API_BASE_URL}/quizzes/${quizId}`);
                if (!response.ok) {
                    if (response.status === 401 || response.status === 403) {
                        console.error('Authentication failed while fetching quiz. Please log in again.');
                    }
                    throw new Error(`Failed to fetch quiz: ${response.statusText}`);
                }
                const data = await response.json();
                setQuiz(data);
            } catch (err) {
                console.error("Error fetching quiz:", err);
                setError('Failed to load quiz. Please try again later.');
                setQuiz(null);
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [quizId]); // Re-fetch when quizId changes

    const handleAnswerChange = (questionId, answer) => {
        setSelectedAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answer
        }));
    };

    const handleSubmitQuiz = async () => {
        if (!quiz) return;

        setIsSubmitting(true);
        setError(null);

        // Transform selectedAnswers into the format expected by the backend
        const answersToSubmit = Object.keys(selectedAnswers).map(questionId => ({
            questionId: questionId,
            userAnswer: selectedAnswers[questionId]
        }));

        try {
            // Use authFetch for this submission
            const response = await authFetch(`${API_BASE_URL}/quizzes/${quiz._id}/submit`, {
                method: 'POST',
                body: JSON.stringify({ answers: answersToSubmit })
            });

            if (!response.ok) {
                 if (response.status === 401 || response.status === 403) {
                    console.error('Authentication failed while submitting quiz. Please log in again.');
                }
                throw new Error(`Quiz submission failed: ${response.statusText}`);
            }

            const result = await response.json();
            setSubmissionResult(result);
            setSubmitted(true);
        } catch (err) {
            console.error("Error submitting quiz:", err);
            setError('Failed to submit quiz. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };


    if (loading) {
        return (
            <div className="text-center mt-8 text-gray-600 dark:text-gray-400">
                <i className="fas fa-spinner fa-spin mr-2"></i> Loading quiz...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center mt-8 text-red-600 dark:text-red-400">
                <i className="fas fa-exclamation-triangle mr-2"></i> {error}
                <button
                    onClick={() => handleSectionChange('my-courses-content')}
                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                >
                    Back to Courses
                </button>
            </div>
        );
    }

    if (!quiz) {
        return (
             <div className="flex flex-col items-center justify-center min-h-screen-content text-gray-700 dark:text-gray-300">
                <i className="fas fa-exclamation-circle text-6xl mb-4 text-yellow-500"></i>
                <h2 className="text-2xl font-bold mb-2">No Quiz Selected</h2>
                <p className="text-lg mb-4">Please navigate to a course and start a quiz from there.</p>
                <button
                    onClick={() => handleSectionChange('my-courses-content')}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 text-lg"
                >
                    Go to My Courses
                </button>
            </div>
        );
    }

    return (
        <section className="quizzes-content bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg p-6">
            <button
                onClick={() => handleSectionChange(`course-${quiz.course?.id || 'my-courses-content'}`)}
                className="mb-6 flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
            >
                <i className="fas fa-arrow-left mr-2"></i> Back to Course: {quiz.course?.title || 'Unknown Course'}
            </button>

            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">{quiz.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">{quiz.description}</p>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm">Pass Percentage: {quiz.passPercentage}%</p>

            {submitted ? (
                <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quiz Results</h3>
                    <p className="text-xl mb-2 text-gray-800 dark:text-gray-200">
                        Your Score: <span className="font-semibold">{submissionResult.score}</span> / <span className="font-semibold">{submissionResult.totalQuestions}</span>
                    </p>
                    <p className="text-xl mb-4 text-gray-800 dark:text-gray-200">
                        Percentage: <span className="font-semibold">{submissionResult.percentage.toFixed(2)}%</span>
                    </p>
                    <p className={`text-2xl font-bold ${submissionResult.passed ? 'text-green-600' : 'text-red-600'}`}>
                        {submissionResult.passed ? '🎉 Passed!' : '😢 Failed. Keep trying!'}
                    </p>

                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Detailed Results:</h4>
                    <div className="space-y-4">
                        {submissionResult.results.map((result, index) => (
                            <div key={index} className={`p-4 rounded-lg ${result.isCorrect ? 'bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700' : 'bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700'}`}>
                                <p className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{result.questionText}</p>
                                <p className="text-gray-700 dark:text-gray-300">Your Answer: <span className="font-medium italic">{result.userAnswer || 'No answer'}</span></p>
                                <p className="text-gray-700 dark:text-gray-300">Correct Answer: <span className="font-medium italic">{result.correctAnswer}</span></p>
                                <p className={`font-bold ${result.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                    {result.isCorrect ? 'Correct!' : 'Incorrect.'}
                                </p>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => handleSectionChange(`course-${quiz.course?.id}`)}
                        className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    >
                        Back to Course Overview
                    </button>
                </div>
            ) : (
                <div className="mt-8 space-y-8">
                    {quiz.questions.map((question, qIndex) => (
                        <div key={question.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <p className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                {qIndex + 1}. {question.questionText}
                            </p>
                            {question.type === 'multiple-choice' || question.type === 'true-false' ? (
                                <div className="space-y-3">
                                    {question.options.map((option, oIndex) => (
                                        <label key={oIndex} className="flex items-center text-gray-700 dark:text-gray-300 cursor-pointer">
                                            <input
                                                type="radio"
                                                name={`question-${question.id}`}
                                                value={option.text}
                                                checked={selectedAnswers[question.id] === option.text}
                                                onChange={() => handleAnswerChange(question.id, option.text)}
                                                className="form-radio h-5 w-5 text-blue-600 dark:text-blue-400 mr-3"
                                            />
                                            <span className="text-lg">{option.text}</span>
                                        </label>
                                    ))}
                                </div>
                            ) : question.type === 'short-answer' ? (
                                <input
                                    type="text"
                                    value={selectedAnswers[question.id] || ''}
                                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Type your answer here..."
                                />
                            ) : null}
                        </div>
                    ))}
                    <button
                        onClick={handleSubmitQuiz}
                        disabled={isSubmitting}
                        className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 text-lg font-bold flex items-center justify-center"
                    >
                        {isSubmitting ? (
                            <>
                                <i className="fas fa-spinner fa-spin mr-3"></i> Submitting...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-paper-plane mr-3"></i> Submit Quiz
                            </>
                        )}
                    </button>
                </div>
            )}
        </section>
    );
};

export default QuizzesContent;
