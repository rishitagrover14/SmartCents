import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import './main.css'; // Assuming this contains styles for flipping

const Option = ({ option, disabled }) => {
    const [flipped, setFlipped] = useState(false); // State to track if card is flipped
    const [{ isDragging }, dragRef] = useDrag({
        type: 'option',
        item: { id: option._id },
        canDrag: !disabled,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const handleClick = () => {
        if (!disabled) { // Only flip the card if it's not disabled
            setFlipped(!flipped); // Toggle flipped state
        }
    };

    return (
        <div
            ref={dragRef}
            onClick={handleClick}
            className={`card ${flipped ? 'flipped' : ''} ${disabled ? 'disabled' : ''}`}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <div className="card-inner">
                <div className="card-front">Click to Flip</div>
                <div className="card-back">{option.text}</div>
            </div>
        </div>
    );
};

export default Option;
