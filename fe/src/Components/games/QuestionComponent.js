import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';
import './main.css';
import NavBlack from "../navbarBlack/NavBlack";
import { useParams, useNavigate } from 'react-router-dom';

const ItemTypes = {
    OPTION: 'option',
};

const Option = ({ option, flippedProp, disabled }) => {
    const [flipped, setFlipped] = useState(flippedProp);
    const [{ isDragging }, dragRef] = useDrag({
        type: ItemTypes.OPTION,
        item: { id: option._id },
        canDrag: !disabled,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    useEffect(() => {
        // Update the flipped state based on the prop
        setFlipped(flippedProp);
    }, [flippedProp]);

    const handleClick = () => {
        if (!flipped) {
            setFlipped(true);
        }
    };

    return (
        <div
            ref={dragRef}
            onClick={handleClick}
            className={`card ${flipped ? 'flipped' : ''} ${disabled ? 'disabled' : ''}`}
            style={{
                opacity: disabled ? 0.5 : 1,  // Set opacity to 0.5 if disabled, otherwise 1
                cursor: disabled ? 'not-allowed' : 'pointer',  // Change cursor based on disabled state
            }}
        >
            <div className="card-inner">
                <div className="card-front">Click to Flip</div>
                <div className="card-back">{option.text}</div>
            </div>
        </div>
    );
};

const DropArea = ({ onDrop, label, className }) => {
    const [, dropRef] = useDrop({
        accept: ItemTypes.OPTION,
        drop: (item) => onDrop(item.id, label === 'True'),
    });

    return (
        <div ref={dropRef} className={`drop-area-${className}`}>
            Drop Here if {label}
        </div>
    );
};

const QuestionComponent = () => {
    const [question, setQuestion] = useState(null);
    const [selectedTrueOptions, setSelectedTrueOptions] = useState([]);
    const [selectedFalseOptions, setSelectedFalseOptions] = useState([]);
    const [points, setPoints] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [attemptsLeft, setAttemptsLeft] = useState(3);
    const [message, setMessage] = useState('');
    const [manualCompleted, setManualCompleted] = useState(false); // State to track manual completion
    const [showManualCompletionButton, setShowManualCompletionButton] = useState(true); // Initially show the button
    const [flippedCards, setFlippedCards] = useState([]); // State to track flipped cards
    const token = sessionStorage.getItem("token");
    const { questionId } = useParams();
    const navigate = useNavigate(); // useNavigate hook for navigation

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/questions/${questionId}`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                setQuestion(response.data.question);
            } catch (error) {
                console.error(error);
            }
        };

        fetchQuestion();
    }, [questionId, token]);

    const handleDrop = (id, isTrue) => {
        if (isTrue && !selectedTrueOptions.includes(id)) {
            setSelectedTrueOptions([...selectedTrueOptions, id]);
        } else if (!isTrue && !selectedFalseOptions.includes(id)) {
            setSelectedFalseOptions([...selectedFalseOptions, id]);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/v1/submit-answer', {
                questionId: question._id,
                selectedOptions: [...selectedTrueOptions, ...selectedFalseOptions],
            }, {
                headers: {
                    Authorization: `${token}`,
                },
            });

            // Display message in an alert box based on the response
            window.alert(response.data.message);

            // Handle different scenarios based on response success
            if (response.data.success) {
                setPoints(response.data.points);
                setCurrentQuestion(response.data.currentQuestion);

                try {
                    // Fetch next question only on success if needed
                    const nextQuestionResponse = await axios.get(`http://localhost:4000/api/v1/questions/${response.data.nextQuestionId}`, {
                        headers: {
                            Authorization: `${token}`,
                        },
                    });
                    setQuestion(nextQuestionResponse.data.question);

                    // Clear selected options state
                    setSelectedTrueOptions([]);
                    setSelectedFalseOptions([]);

                    // Navigate to the next question
                } catch (fetchError) {
                    console.error(fetchError);

                    window.alert("Redirecting to Level Map Page" + navigate('/timeline'));
                }
            } else {
                // Update attempts left if failed due to attempts limit
                setAttemptsLeft(attemptsLeft - 1);
                // Show manual completion button when attempts left is 1
                // setShowManualCompletionButton(attemptsLeft === 1);
            }
        } catch (error) {
            console.error(error);

            // Check if the error response contains a message from the server
            if (error.response && error.response.data && error.response.data.message) {
                window.alert(error.response.data.message);
            } else {
                // Generic error message for other cases
                window.alert('An error occurred while submitting the answer.');
            }
        } finally {
            // Reset all selected options state after handling submission
            setSelectedTrueOptions([]);
            setSelectedFalseOptions([]);
        }
    };


    const isOptionDisabled = (id) => {
        return selectedTrueOptions.includes(id) || selectedFalseOptions.includes(id);
    };

    const handleManualCompletion = async () => {
        try {
            const response = await axios.patch(`http://localhost:4000/api/v1/question/${question._id}/mark-completed`, {}, {
                headers: {
                    Authorization: `${token}`,
                },
            });

            // Display message in an alert box based on the response
            window.alert(response.data.message);

            if (response.data.success) {
                // Flip all correct option cards by marking them as manually completed
                const correctOptionIds = question.options
                    .filter(option => option.isCorrect)
                    .map(option => option._id);

                setSelectedTrueOptions(correctOptionIds);

                // Set manual completion state
                setManualCompleted(true);

                // Hide the manual completion button after manual completion
                setShowManualCompletionButton(false);

                // Update flipped cards state to all correct options
                setFlippedCards(correctOptionIds);

                setTimeout(() => {
                    navigate(`/timeline`);
                }, 5000);
            }
        } catch (error) {
            console.error(error);

            // Check if the error response contains a message from the server
            if (error.response && error.response.data && error.response.data.message) {
                window.alert(error.response.data.message);
            } else {
                // Generic error message for other cases
                window.alert('An error occurred while marking the question as completed.');
            }
        }
    };

    if (!question) {
        return <div>Loading...</div>;
    }

    return (
        <div className='banking'>
            <NavBlack />
            <div className='banktop'>
            <DndProvider backend={HTML5Backend}>
                <div className="container">
                    <div className="question-area">
                        <div className="question-box">
                            <p className='bankq'>{question.questionText}</p>
                        </div>

                        <div className="drop-areas">
                            <DropArea onDrop={handleDrop} label="True" className="true" />
                            <DropArea onDrop={handleDrop} label="False" className="false" />
                        </div>
                        <button onClick={handleSubmit} className="submit-button">
                            Submit
                        </button>

                        {/* Render the button based on showManualCompletionButton and manualCompleted */}
                        {(showManualCompletionButton && !manualCompleted) ? (
                            <button onClick={handleManualCompletion} className="mark-completed-button">
                                Mark Question as Completed
                            </button>
                        ) : (
                            <button disabled className="mark-completed-button">
                                Mark Question as Completed
                            </button>
                        )}

                        {message && <div className="message">{message}</div>}
                    </div>

                    <div className="options-container">
                        <div className="options-area">
                            {question.options.map((option) => (
                                <Option
                                    key={option._id}
                                    option={option}
                                    flippedProp={selectedTrueOptions.includes(option._id) || flippedCards.includes(option._id)}
                                    disabled={isOptionDisabled(option._id)}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </DndProvider>
            </div>
        </div>
    );
};

export default QuestionComponent;
