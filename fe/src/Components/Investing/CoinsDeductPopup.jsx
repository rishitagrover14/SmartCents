import React from 'react';
// import './home.css';

const CoinsDeductPopup = ({ onConfirm, onCancel }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                
                <p>
                    50 Coins will be deducted.
                </p>
                <button onClick={onConfirm}>Continue</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default CoinsDeductPopup;