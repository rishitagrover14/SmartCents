import React from 'react';

const ExpensePopup = ({ newExpense, onSave }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>New Expense Category</h2>
                <p>Is "{newExpense.description}" a necessity or a want?</p>
                <div className="button-container">
                    <button onClick={() => onSave('Necessity')}>Necessity</button>
                    <button onClick={() => onSave('Want')}>Want</button>
                    <button onClick={() => onSave('')}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ExpensePopup;
