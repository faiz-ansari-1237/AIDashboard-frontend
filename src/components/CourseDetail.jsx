import React, { useState, useEffect } from 'react';

/**
 * CourseDetail Component: Displays detailed information about a selected course,
 * including its topics and lessons with content, navigation, and completion tracking,
 * and now also lists associated quizzes.
 * @param {object} props - Component props.
 * @param {object} props.currentCourseDetail - The full course object selected from App.jsx state.
 * @param {function} props.handleSectionChange - Function to navigate back to My Courses or to a Quiz.
 */
const CourseDetail = ({ currentCourseDetail, handleSectionChange }) => {
    const [activeLessonId, setActiveLessonId] = useState(null);
    const [completedLessons, setCompletedLessons] = useState({});
    const [quizzes, setQuizzes] = useState([]);
    const [quizzesLoading, setQuizzesLoading] = useState(true);
    const [quizzesError, setQuizzesError] = useState(null);

    // Define your backend URL
    const API_BASE_URL = 'http://localhost:5000/api';

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
        if (currentCourseDetail) {
            setActiveLessonId(currentCourseDetail.lessons?.[0]?.id || null);

            const storedCompletion = JSON.parse(localStorage.getItem(`course_${currentCourseDetail.id}_completion`)) || {};
            setCompletedLessons(storedCompletion);

            const fetchQuizzesForCourse = async () => {
                setQuizzesLoading(true);
                setQuizzesError(null);
                try {
                    // Use authFetch for this request
                    const response = await authFetch(`${API_BASE_URL}/quizzes/course/${currentCourseDetail._id}`);
                    if (!response.ok) {
                        // Handle cases where token might be expired or invalid
                        if (response.status === 401 || response.status === 403) {
                             // This usually means the token is invalid/expired.
                             // In a real app, you'd likely trigger a global logout or redirect to login.
                             // For now, we'll just log an error.
                            console.error('Authentication failed while fetching quizzes. Please log in again.');
                        }
                        throw new Error(`Failed to fetch quizzes: ${response.statusText}`);
                    }
                    const data = await response.json();
                    setQuizzes(data);
                } catch (error) {
                    console.error("Error fetching quizzes for course:", error);
                    setQuizzesError('Failed to load quizzes. Please try again later.');
                    setQuizzes([]);
                } finally {
                    setQuizzesLoading(false);
                }
            };
            fetchQuizzesForCourse();
        }
    }, [currentCourseDetail]);


    const toggleLessonContent = (lessonId) => {
        setActiveLessonId(prevId => (prevId === lessonId ? null : lessonId));
    };

    const navigateLesson = (direction) => {
        if (!currentCourseDetail || !currentCourseDetail.lessons || currentCourseDetail.lessons.length === 0) {
            return;
        }

        const currentLessonIndex = currentCourseDetail.lessons.findIndex(
            lesson => lesson.id === activeLessonId
        );

        let newLessonIndex;
        if (direction === 'next') {
            newLessonIndex = currentLessonIndex + 1;
        } else if (direction === 'prev') {
            newLessonIndex = currentLessonIndex - 1;
        }

        if (newLessonIndex >= 0 && newLessonIndex < currentCourseDetail.lessons.length) {
            setActiveLessonId(currentCourseDetail.lessons[newLessonIndex].id);
            const lessonContentElement = document.getElementById(`lesson-content-${currentCourseDetail.lessons[newLessonIndex].id}`);
            lessonContentElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const markLessonComplete = (lessonId) => {
        const newCompletedLessons = {
            ...completedLessons,
            [lessonId]: true
        };
        setCompletedLessons(newCompletedLessons);
        localStorage.setItem(`course_${currentCourseDetail.id}_completion`, JSON.stringify(newCompletedLessons));
    };


    if (!currentCourseDetail) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen-content text-gray-700 dark:text-gray-300">
                <i className="fas fa-exclamation-circle text-6xl mb-4 text-yellow-500"></i>
                <h2 className="text-2xl font-bold mb-2">Course Not Found or Not Selected</h2>
                <p className="text-lg mb-4">Please select a course from the 'My Courses' section.</p>
                <button
                    onClick={() => handleSectionChange('my-courses-content')}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 text-lg"
                >
                    Go to My Courses
                </button>
            </div>
        );
    }

    const currentLessonIndex = currentCourseDetail.lessons?.findIndex(
        lesson => lesson.id === activeLessonId
    );
    const hasPrevLesson = currentLessonIndex > 0;
    const hasNextLesson = currentLessonIndex !== -1 && currentLessonIndex < currentCourseDetail.lessons.length - 1;


    const {
        title,
        description,
        longDescription,
        imageUrl,
        category,
        instructor,
        duration,
        difficulty,
        lessons,
        topics
    } = currentCourseDetail;

    return (
        <section className="course-detail-content bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg p-6">
            <button
                onClick={() => handleSectionChange('my-courses-content')}
                className="mb-6 flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
            >
                <i className="fas fa-arrow-left mr-2"></i> Back to My Courses
            </button>

            <div className="flex flex-col lg:flex-row gap-6 mb-8 items-start">
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full lg:w-1/3 h-64 object-cover rounded-lg shadow-md flex-shrink-0"
                    />
                )}
                <div className="flex-grow">
                    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">{title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">{description}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-700 dark:text-gray-300 mb-6">
                        <span className="flex items-center">
                            <i className="fas fa-chalkboard-teacher mr-2 text-blue-500"></i>
                            Instructor: <span className="font-semibold ml-1">{instructor || 'N/A'}</span>
                        </span>
                        <span className="flex items-center">
                            <i className="fas fa-clock mr-2 text-blue-500"></i>
                            Duration: <span className="font-semibold ml-1">{duration || 'N/A'}</span>
                        </span>
                        <span className="flex items-center">
                            <i className="fas fa-chart-line mr-2 text-blue-500"></i>
                            Difficulty: <span className="font-semibold ml-1">{difficulty || 'N/A'}</span>
                        </span>
                        <span className="flex items-center">
                            <i className="fas fa-tags mr-2 text-blue-500"></i>
                            Category: <span className="font-semibold ml-1">{category || 'N/A'}</span>
                        </span>
                    </div>

                    <p className="text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">
                        {longDescription || description}
                    </p>

                    <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 text-lg">
                        Enroll in Course
                    </button>
                </div>
            </div>

            {/* Topics/Modules Section */}
            {topics && topics.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Course Topics</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        {topics.map((topic) => (
                            <li key={topic.id} className="text-lg">
                                <span className="font-semibold">{topic.title}:</span> {topic.description}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Lessons Section - Now with detailed content toggle and navigation */}
            {lessons && lessons.length > 0 && (
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Lessons</h3>
                    <div className="space-y-4">
                        {lessons.map((lesson) => (
                            <div key={lesson.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md transition-shadow duration-200">
                                <div className="p-4 flex items-center justify-between">
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 flex items-center">
                                            {completedLessons[lesson.id] && (
                                                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                                            )}
                                            {lesson.title}
                                        </h4>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">{lesson.description}</p>
                                        <span className="text-blue-500 text-xs">{lesson.duration}</span>
                                    </div>
                                    <div className="flex space-x-2">
                                        {lesson.content && (
                                            <button
                                                onClick={() => toggleLessonContent(lesson.id)}
                                                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center"
                                            >
                                                {activeLessonId === lesson.id ? 'Hide Content' : 'View Content'}
                                                <i className={`ml-2 fas ${activeLessonId === lesson.id ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                                            </button>
                                        )}
                                        {!completedLessons[lesson.id] && (
                                            <button
                                                onClick={() => markLessonComplete(lesson.id)}
                                                className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
                                            >
                                                Mark Complete
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {activeLessonId === lesson.id && lesson.content && (
                                    <div
                                        id={`lesson-content-${lesson.id}`}
                                        className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-850 text-gray-800 dark:text-gray-200 lesson-content"
                                        dangerouslySetInnerHTML={{ __html: lesson.content }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between mt-8">
                        <button
                            onClick={() => navigateLesson('prev')}
                            disabled={!hasPrevLesson}
                            className={`px-6 py-3 rounded-lg transition duration-300 ${
                                hasPrevLesson
                                    ? 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white'
                                    : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-600 cursor-not-allowed'
                            }`}
                        >
                            <i className="fas fa-chevron-left mr-2"></i> Previous Lesson
                        </button>
                        <button
                            onClick={() => navigateLesson('next')}
                            disabled={!hasNextLesson}
                            className={`px-6 py-3 rounded-lg transition duration-300 ${
                                hasNextLesson
                                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                    : 'bg-blue-300 dark:bg-blue-700 text-blue-100 dark:text-blue-200 cursor-not-allowed'
                            }`}
                        >
                            Next Lesson <i className="fas fa-chevron-right ml-2"></i>
                        </button>
                    </div>
                </div>
            )}

            {/* Quizzes Section */}
            {quizzesLoading ? (
                <div className="text-center mt-8 text-gray-600 dark:text-gray-400">
                    <i className="fas fa-spinner fa-spin mr-2"></i> Loading quizzes...
                </div>
            ) : quizzesError ? (
                <div className="text-center mt-8 text-red-600 dark:text-red-400">
                    <i className="fas fa-exclamation-triangle mr-2"></i> {quizzesError}
                </div>
            ) : quizzes.length > 0 && (
                <div className="mt-10">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quizzes for this Course</h3>
                    <div className="space-y-4">
                        {quizzes.map(quiz => (
                            <div key={quiz._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center justify-between">
                                <div>
                                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{quiz.title}</h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">{quiz.description}</p>
                                </div>
                                <button
                                    onClick={() => handleSectionChange(`quizzes-content`, quiz._id)}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200"
                                >
                                    Start Quiz
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default CourseDetail;
