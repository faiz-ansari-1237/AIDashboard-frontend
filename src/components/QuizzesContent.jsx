import React, { useState, useEffect } from 'react';

/**
 * QuizzesContent Component: Displays either a specific quiz (if quizId is provided)
 * or a list of quizzes for a specific course (if courseId is provided),
 * or a general list of all quizzes (if neither is provided).
 * Handles user answers, and submits the quiz.
 *
 * @param {object} props - Component props.
 * @param {string} [props.quizId] - Optional. The ID of a specific quiz to load and display.
 * @param {string} [props.courseId] - Optional. The ID of a course to load quizzes for.
 * @param {function} props.handleSectionChange - Function to navigate back to CourseDetail or MyCourses.
 * @param {function} props.authFetch - Helper function for authenticated API calls, passed from App.jsx.
 */
const QuizzesContent = ({ quizId, courseId, handleSectionChange, authFetch }) => {
    const [quiz, setQuiz] = useState(null);
    const [quizzesList, setQuizzesList] = useState([]); // For displaying a list of all quizzes or quizzes for a course
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userAnswers, setUserAnswers] = useState({}); // Stores user's selected answers { questionId: 'answer' }
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [submissionResult, setSubmissionResult] = useState(null); // Stores score, results after submission
    const [isSubmitting, setIsSubmitting] = useState(false); // Tracks if submission is in progress

    // Effect to fetch quiz data based on provided props
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            setQuizSubmitted(false); // Reset submission state
            setSubmissionResult(null); // Clear previous results
            setUserAnswers({}); // Clear user answers

            // Ensure authFetch is available before making API calls
            if (!authFetch) {
                setLoading(false);
                setError("Authentication helper not available. Please ensure you are logged in.");
                return;
            }

            try {
                let response;
                let data;

                if (quizId) {
                    // Fetch a specific quiz by its ID
                    console.log(`Fetching specific quiz with ID: ${quizId}`);
                    response = await authFetch(`/quizzes/${quizId}`); // Use authFetch
                    if (!response.ok) {
                        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
                        throw new Error(`Failed to fetch specific quiz: ${errorData.message || response.statusText}`);
                    }
                    data = await response.json();
                    setQuiz(data);
                    setQuizzesList([]); // Clear list if a specific quiz is loaded
                } else if (courseId) {
                    // Fetch quizzes for a specific course ID
                    console.log(`Fetching quizzes for course ID: ${courseId}`);
                    response = await authFetch(`/quizzes/course/${courseId}`); // Use authFetch
                    if (!response.ok) {
                        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
                        throw new Error(`Failed to fetch quizzes for course: ${errorData.message || response.statusText}`);
                    }
                    data = await response.json();
                    setQuizzesList(data);
                    setQuiz(null); // Clear specific quiz if list is loaded
                } else {
                    // Fetch all quizzes (for a general quizzes page, e.g., from sidebar)
                    console.log('Fetching all quizzes.');
                    response = await authFetch(`/quizzes`); // Use authFetch
                    if (!response.ok) {
                        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
                        throw new Error(`Failed to fetch all quizzes list: ${errorData.message || response.statusText}`);
                    }
                    data = await response.json();
                    setQuizzesList(data);
                    setQuiz(null); // Clear specific quiz if list is loaded
                }
            } catch (err) {
                console.error("Error fetching quiz data:", err);
                setError(`Failed to load quizzes: ${err.message}. Please ensure backend is running and data exists, and you are logged in.`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [quizId, courseId, authFetch]); // Re-run when quizId, courseId, or authFetch changes

    // Handle answer changes for different question types
    const handleAnswerChange = (questionId, value) => {
        setUserAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: value
        }));
    };

    // Submit Quiz Handler
    const handleSubmitQuiz = async () => {
        if (!quiz) return;

        setIsSubmitting(true);
        setError(null);

        // Transform userAnswers into the format expected by the backend
        const answersToSend = Object.keys(userAnswers).map(questionId => ({
            questionId: questionId,
            userAnswer: userAnswers[questionId]
        }));

        try {
            // Use quiz._id as the ID for submission
            const response = await authFetch(`/quizzes/${quiz._id}/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ answers: answersToSend }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
                throw new Error(`Quiz submission failed: ${errorData.message || response.statusText}`);
            }

            const result = await response.json();
            setSubmissionResult(result);
            setQuizSubmitted(true);
        } catch (err) {
            console.error("Error submitting quiz:", err);
            setError(`Failed to submit quiz: ${err.message}. Please try again.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Render loading state
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen-content text-gray-700 dark:text-gray-300">
                <i className="fas fa-spinner fa-spin text-6xl mb-4 text-blue-500"></i>
                <p className="text-lg">Loading quizzes...</p>
            </div>
        );
    }

    // Render error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen-content text-gray-700 dark:text-gray-300">
                <i className="fas fa-exclamation-triangle text-6xl mb-4 text-red-500"></i>
                <p className="text-lg">{error}</p>
                <button
                    onClick={() => handleSectionChange('my-courses-content')}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 text-lg mt-4"
                >
                    Go to My Courses
                </button>
            </div>
        );
    }

    // Render specific quiz content if quizId is provided and quiz data is loaded
    if (quizId && quiz) {
        return (
            <section className="quiz-content bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg p-6">
                <button
                    onClick={() => handleSectionChange(`course-${quiz.course?.id || 'my-courses-content'}`)} // Navigate back to course detail or general courses
                    className="mb-6 flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                >
                    <i className="fas fa-arrow-left mr-2"></i> Back to Course: {quiz.course?.title || 'Unknown Course'}
                </button>

                <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">{quiz.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">{quiz.description}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm">Pass Percentage: {quiz.passPercentage}%</p>


                {!quizSubmitted ? (
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmitQuiz(); }}>
                        {quiz.questions.map((question, qIndex) => (
                            <div key={question.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                                <p className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    {qIndex + 1}. {question.questionText}
                                </p>
                                {question.type === 'multiple-choice' || question.type === 'true-false' ? (
                                    <div className="space-y-3">
                                        {question.options.map((option, oIndex) => (
                                            <label key={oIndex} className="flex items-center text-gray-800 dark:text-gray-200 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name={`question-${question.id}`} // Use question.id for unique grouping
                                                    value={option.text}
                                                    checked={userAnswers[question.id] === option.text}
                                                    onChange={() => handleAnswerChange(question.id, option.text)}
                                                    className="form-radio h-5 w-5 text-blue-600 dark:text-blue-400"
                                                />
                                                <span className="ml-3 text-lg">{option.text}</span>
                                            </label>
                                        ))}
                                    </div>
                                ) : question.type === 'short-answer' ? (
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                        value={userAnswers[question.id] || ''}
                                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                        placeholder="Your answer"
                                    />
                                ) : null}
                            </div>
                        ))}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 text-lg flex items-center justify-center"
                        >
                            {isSubmitting ? <i className="fas fa-spinner fa-spin mr-2"></i> : ''}
                            {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
                        </button>
                    </form>
                ) : (
                    // Quiz Results Display
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Quiz Results</h3>
                        {submissionResult && (
                            <>
                                <p className="text-xl mb-2">
                                    Your Score: <span className="font-bold text-blue-600 dark:text-blue-400">{submissionResult.score} / {submissionResult.totalQuestions}</span>
                                </p>
                                <p className="text-xl mb-4">
                                    Percentage: <span className={`font-bold ${submissionResult.passed ? 'text-green-600' : 'text-red-600'}`}>{submissionResult.percentage.toFixed(2)}%</span>
                                    {submissionResult.passed ? ' - Passed!' : ' - Failed.'}
                                </p>

                                <h4 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Detailed Feedback:</h4>
                                <div className="space-y-4">
                                    {submissionResult.results.map((result, index) => (
                                        <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                                            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                                {index + 1}. {result.questionText}
                                            </p>
                                            <p className={`text-md ${result.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                                Your Answer: <span className="font-semibold">{result.userAnswer || '[No Answer]'}</span>
                                                {result.isCorrect ? ' (Correct)' : ' (Incorrect)'}
                                            </p>
                                            {!result.isCorrect && (
                                                <p className="text-md text-gray-700 dark:text-gray-300">
                                                    Correct Answer: <span className="font-semibold">{result.correctAnswer}</span>
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => handleSectionChange(`course-${quiz.course?.id || 'my-courses-content'}`)}
                                    className="mt-6 w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-lg"
                                >
                                    Back to Course
                                </button>
                            </>
                        )}
                    </div>
                )}
            </section>
        );
    }

    // Render list of quizzes for a specific course (if courseId is provided but no specific quizId)
    // Or render a list of all quizzes if neither quizId nor courseId is provided.
    // This part assumes that if courseId is present, we want quizzes for that course.
    // If no courseId and no quizId, it defaults to showing all quizzes.
    if (quizzesList.length > 0) {
        return (
            <section className="quizzes-list-content bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg p-6">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                    {courseId ? `Quizzes for Course: ${quizzesList[0]?.course?.title || 'Loading...'}` : 'All Quizzes & Assessments'}
                </h2>
                <button
                    onClick={() => handleSectionChange('my-courses-content')}
                    className="mb-6 flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                >
                    <i className="fas fa-arrow-left mr-2"></i> Back to Courses
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quizzesList.map(quizItem => (
                        <div key={quizItem._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-transform transform hover:scale-102 flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{quizItem.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{quizItem.description}</p>
                                {quizItem.course && (
                                    <p className="text-gray-500 dark:text-gray-400 text-xs mb-3">
                                        Course: <span className="font-medium">{quizItem.course.title}</span>
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={() => handleSectionChange(`quiz-${quizItem._id}`, quizItem._id)}
                                className="mt-auto self-start px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200"
                            >
                                Start Quiz
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    // Fallback if no specific quiz, no course quizzes, and no general quizzes found/loaded
    return (
        <div className="flex flex-col items-center justify-center min-h-screen-content text-gray-700 dark:text-gray-300">
            <i className="fas fa-question-circle text-6xl mb-4 text-gray-400"></i>
            <h2 className="text-2xl font-bold mb-2">No Quizzes Found</h2>
            <p className="text-lg mb-4">It seems there are no quizzes available or loaded at this time.</p>
            <button
                onClick={() => handleSectionChange('my-courses-content')}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 text-lg"
            >
                Back to My Courses
            </button>
        </div>
    );
};

export default QuizzesContent;
