import React from 'react';
import './home.css';

const InsufficientFundsPopup = ({ onConfirm, onCancel }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Insufficient Funds</h2>
                <p>
                    There are insufficient funds in the selected type.
                    The remaining amount will be deducted from savings.
                </p>
                <button onClick={onConfirm}>Continue</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default InsufficientFundsPopup;
