import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './timeline.css';
import NavBlack from "../navbarBlack/NavBlack";
import axios from 'axios';

const GamePath = () => {
    const [questions, setQuestions] = useState([]);
    const [user, setUser] = useState(null);
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/v1/questions', {
                    headers: {
                        Authorization: `${token}`,
                    },
                });

                const userResponse = await axios.get('http://localhost:4000/api/v1/currentUser', {
                    headers: {
                        Authorization: `${token}`,
                    },
                });

                const userData = userResponse.data.user;
                setUser(userData);

                const questionsWithLock = response.data.questions.map((question, index) => {
                    const userAnswer = userData.questionsAnswered.find(answer => answer.questionId === question._id);

                    const isAnsweredCorrectly = userAnswer ? userAnswer.correct : false;
                    const manuallyCompleted = userAnswer ? userAnswer.manuallyCompleted : false;

                    const previousQuestionAnsweredCorrectly = index === 0 || userData.questionsAnswered.some(answer => answer.questionId === response.data.questions[index - 1]._id && answer.correct);
                    const previousQuestionManuallyCompleted = index === 0 || userData.questionsAnswered.some(answer => answer.questionId === response.data.questions[index - 1]._id && answer.manuallyCompleted);

                    // Determine if the question is locked based on conditions
                    const locked = !(previousQuestionAnsweredCorrectly || previousQuestionManuallyCompleted);

                    return {
                        ...question,
                        locked: locked,
                        answeredCorrectly: isAnsweredCorrectly,
                        manuallyCompleted: manuallyCompleted,
                    };
                });

                setQuestions(questionsWithLock);
            } catch (error) {
                console.error("Error fetching questions or user data", error);
            }
        };

        fetchQuestions();
    }, [token]);

    const handleCircleClick = (questionId, index) => {
        const question = questions[index];

        if (!question.locked) {
            navigate(`/question/${questionId}`);
        } else {
            alert('This question is locked!');
        }
    };

    return (
        <Fragment>
            <NavBlack />
            <div className='levlmap'>
                <div className='levelhead'>Ready for your next challenge? Tap to unlock the knowledge ahead !</div>

                <div className="path-container">
                {questions.map((question, index) => (
                    <Fragment key={question._id}>
                        <div
                            className={`circle ${question.locked ? 'locked' : (question.answeredCorrectly || question.manuallyCompleted ? 'completed' : 'start')}`}
                            onClick={() => handleCircleClick(question._id, index)}
                        >
                            {question.locked ? (
                                <i className="fa fa-lock" aria-hidden="true"></i>
                            ) : (
                                index + 1
                            )}
                        </div>
                        {index < questions.length - 1 && <div className="path"></div>}
                    </Fragment>
                ))}
            </div>
            </div>
        </Fragment>
    );
};

export default GamePath;
