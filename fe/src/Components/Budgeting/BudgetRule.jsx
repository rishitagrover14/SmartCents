import React, { useState } from 'react';
import './budgetRule.css';

const BudgetRule = ({ onSalarySubmit }) => {
  const [salary, setSalary] = useState('');
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const salaryValue = parseFloat(salary);
    if (isNaN(salaryValue) || salaryValue < 0) {
      setError('Please enter a valid non-negative number for salary.');
      return;
    }

    // Retrieve the token from session storage
    const token = sessionStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:4000/api/v1/income/add', {
        method: 'POST',
        headers: {
          'Authorization': `${token}`, // Use the token from session storage
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ income: salaryValue }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to calculate budget. Please try again.');
        return;
      }

      setResults(data.income);
      onSalarySubmit(data.income);
      setError('');
      // Refresh the page on successful submission
      window.location.reload();
    } catch (err) {
      console.error('Failed to submit salary:', err);
      setError('Failed to submit salary. Please try again.');
    }
  };

  return (
      <div className='ruleContent'>
        <div className='ruleInfo'>
          <h2>50-30-20 Rule of Budgeting</h2>
          <p>The 50/30/20 rule is an easy budgeting method that can help you to manage your money effectively, simply and sustainably. The basic rule of thumb is to divide your monthly after-tax income into three spending categories: 50% for necessities, 30% for wants and 20% for savings or paying off debt.<br></br>By regularly keeping your expenses balanced across these main spending areas, you can put your money to work more efficiently. And with only three major categories to track, you can save yourself the time and stress of digging into the details every time you spend.</p>
        </div>
        <div className='step1'>
          <h2>Enter your monthly after-tax income.</h2>
          <div className='underline'></div>
          <form onSubmit={handleSubmit}>
            <input
                className='calculateinput'
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="Enter your income"
                required
            />
            <button type="submit" className='calculatebutton'>Calculate</button>
          </form>
          {error && <div className="error">{error}</div>}
        </div>
      </div>
  );
};

export default BudgetRule;
