import React from 'react';
import './home.css';

const InsufficientSavingsPopup = ({ onClose }) => {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="popup-overlay" onClick={handleOverlayClick}>
            <div className="popup-content">
                <h2>Insufficient Funds</h2>
                <p>
                    Insufficient funds in savings for this expense. Please adjust or update your income.
                </p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default InsufficientSavingsPopup;
