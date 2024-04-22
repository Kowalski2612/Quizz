import "./home.css";
import { useEffect } from "react";
function Home() {
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
                    console.log(data.metadata);
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
            <div id="page" className="single">
                <header>
                    <div className="post-date-publishable">June 6, 2022</div>
                    <div className="title single-title">
                        Salesforce Platform Developer I PDI Exam Dumps
                    </div>
                </header>
                <div className="watu-question">
                    <p>
                        <span className="watupro_num">7. </span>
                        Câu hỏi có 1 câu trả lời
                        <br />
                    </p>
                    <div id="question-choices watupro-choices-columns">
                        <div className="watupro-question-choice" dir="auto">
                            <input
                                type="radio"
                                name="answer-217308[]"
                                id="answer-id-866058"
                                className="answer answerof-217308"
                                value="866058"
                            />
                            <label
                                htmlFor="answer-id-866058"
                                id="answer-label-866058"
                                className="answer"
                            >
                                <span>
                                    Set "Use the first value in the list as the
                                    default value" as True.
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="watu-question">
                    <p>
                        <span className="watupro_num">7. </span>
                        Câu hỏi có nhiều câu trả lời
                        <br />
                    </p>
                    <div className="watupro-question-choice" dir="auto">
                        <input
                            type="checkbox"
                            name="answer-217314[]"
                            id="answer-id-866082"
                            className="answer answerof-217314"
                            value="866082"
                        />
                        <label
                            htmlFor="answer-id-866082"
                            id="answer-label-866082"
                            className="answer"
                        >
                            <span>Workflows</span>
                        </label>
                    </div>
                </div>
                <div className="watupro_buttons flex">
                    <input
                        type="button"
                        name="action"
                        id="action-button"
                        value="Submit"
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;
