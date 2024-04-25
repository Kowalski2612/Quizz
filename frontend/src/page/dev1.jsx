import "./dev1.css";
import { useEffect, useState } from "react";
import Header from "./header";

// Hàm shuffle để random mảng
function shuffle(array) {
for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
}
return array;
}

function Dev1() {
    const [questions, setQuestions] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const currDate = new Date().toLocaleDateString();
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToBottom = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    };

    // Hàm random các câu trả lời
    const shuffleAnswers = (answers) => {
        return shuffle(answers);
    };

    const handleAnswerSelect = (questionId, answerId, isCheckbox) => {
        setSelectedAnswers((prevState) => {
            // Kiểm tra nếu là checkbox
            if (isCheckbox) {
                // Kiểm tra xem đáp án đã được chọn trước đó hay chưa
                const isSelected =
                    prevState[questionId] &&
                    prevState[questionId].includes(answerId);

                // Nếu đáp án đã được chọn trước đó, loại bỏ nó khỏi mảng
                if (isSelected) {
                    const updatedAnswers = prevState[questionId].filter(
                        (id) => id !== answerId
                    );

                    const updatedState = {
                        ...prevState,
                        [questionId]: updatedAnswers,
                    };
                    console.log(updatedState);

                    return updatedState;
                } else {
                    // Nếu đáp án chưa được chọn, thêm nó vào mảng
                    const updatedState = {
                        ...prevState,
                        [questionId]: prevState[questionId]
                            ? [...prevState[questionId], answerId]
                            : [answerId],
                    };
                    console.log(updatedState);

                    return updatedState;
                }
            } else {
                const radioState = {
                    ...prevState,
                    [questionId]: [answerId],
                };
                console.log(radioState);
                return radioState;
            }
        });
    };

    const handleSubmit = () => {
        let score = 0;

        questions.forEach((question) => {
            const selectedAnswerIds = selectedAnswers[question._id];

            if (!Array.isArray(selectedAnswerIds)) return;

            if (selectedAnswerIds.length !== question.correctAnswers.length)
                return;

            const isAllCorrectAnswersSelected = question.correctAnswers.every(
                (correctAnswer) => selectedAnswerIds.includes(correctAnswer)
            );

            if (isAllCorrectAnswersSelected) {
                score++;
            }
        });
        const resultContainer = document.getElementById("result-container");
        if (resultContainer) {
            resultContainer.innerHTML = `Your score: ${score}/${questions.length}`;
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3056/v1/api/app/getquestion",
                    {
                        method: "GET",
                    }
                );
                if (response.ok) {
                    const data = await response.json();
                    // Random các câu trả lời của mỗi câu hỏi
                    const shuffledQuestions = data.metadata.questions.map(question => ({
                        ...question,
                        answers: shuffleAnswers(question.answers)
                    }));
                    setQuestions(shuffledQuestions);
                } else {
                    console.error("Error fetching data:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="main-container">
            <Header />
            <button
                    className="fixed bottom-5 right-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={scrollToTop}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 15l7-7 7 7"
                        />
                    </svg>
                </button>
                {/* Nút để scroll xuống cuối trang */}
                <button
                    className="fixed bottom-5 left-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={scrollToBottom}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>
            <div id="page" className="single">
                <header>
                    <div className="post-date-publishable">{currDate}</div>
                    <div className="title single-title">
                        {/* Salesforce Platform Developer I PDI Exam Dumps */}
                    </div>
                    <div id="result-container"></div>
                </header>
                <div className="main-container">
                    {questions &&
                        questions.map((question, index) => (
                            <div key={index}>
                                <div className="watu-question">
                                    <span className="watupro_num">
                                        Question {index + 1}
                                    </span>
                                    <p>{question.content}</p>
                                    {question.answers.map(
                                        (answer, answerIndex) => (
                                            <div
                                                className="watupro-question-choice"
                                                dir="auto"
                                                key={answerIndex}
                                            >
                                                {question.correctAnswers
                                                    .length > 1 ? (
                                                    <input
                                                        type="checkbox"
                                                        name={`answer-${question._id}`}
                                                        id={`answer-id-${answer._id}`}
                                                        className={`answer answerof-${question._id}`}
                                                        value={answer._id}
                                                        onChange={() =>
                                                            handleAnswerSelect(
                                                                question._id,
                                                                answer,
                                                                true
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    <input
                                                        type="radio"
                                                        name={`answer-${question._id}`}
                                                        id={`answer-id-${answer._id}`}
                                                        className={`answer answerof-${question._id}`}
                                                        value={answer._id}
                                                        onChange={() =>
                                                            handleAnswerSelect(
                                                                question._id,
                                                                answer,
                                                                false
                                                            )
                                                        }
                                                    />
                                                )}
                                                <label
                                                    htmlFor={`answer-id-${answer._id}`}
                                                    className="answer"
                                                >
                                                </label>
                                                    <span>{answer}</span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        ))}
                    <div className="watupro_buttons flex">
                        <input
                            type="button"
                            name="action"
                            onClick={handleSubmit}
                            id="action-button"
                            value="Submit"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dev1;
