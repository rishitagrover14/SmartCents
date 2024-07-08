import React, { useState, useEffect } from 'react';
import './expenseForm.css';
import ExpensePopup from './ExpensePopup';
import InsufficientFundsPopup from './InsufficientFundsPopup';
import InsufficientSavingsPopup from './InsufficientSavingsPopup';
import axios from "axios";

const ExpenseForm = ({ onAddExpense }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [showInsufficientFundsPopup, setShowInsufficientFundsPopup] = useState(false);
    const [showInsufficientSavingsPopup, setShowInsufficientSavingsPopup] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [budget, setBudget] = useState({ currentNecessities: 0, currentWants: 0, currentSavings: 0 });
    const[descriptionItems, setDescriptionItems] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch the budget data from the API
        const fetchBudgetData = async () => {
            try {
                const token = sessionStorage.getItem("token");
                const response = await fetch("http://localhost:4000/api/v1/income/get", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token ? `${token}` : "",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch budget data");
                }

                const data = await response.json();
                setBudget(data.income);
            } catch (error) {
                console.error("Error fetching budget data:", error);
            }
        };

        // Fetch the categories data from the API
        const fetchCategoriesData = async () => {
            try {
                const token = sessionStorage.getItem("token");
                const response = await fetch("http://localhost:4000/api/v1/categories", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token ? `${token}` : "",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch categories data");
                }

                const data = await response.json();
                setCategories(data.categories);
                const descItems = [];
                data.categories.forEach((category) => {
                    const item = {
                      id: category._id,
                      name: category.name,
                      type: category.type,
                    };
                    if (category.type === "Necessity" || category.type === "Want") {
                      descItems.push(item);
                    }
                })
                setDescriptionItems(descItems);
                
            } catch (error) {
                console.error("Error fetching categories data:", error);
            }
        };

        fetchBudgetData();
        fetchCategoriesData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const amountValue = parseFloat(amount);
        if (isNaN(amountValue) || amountValue <= 0) {
            setError('Please enter a valid positive number for the amount.');
            return;
        }

        // Check if the description already exists in the categories
        const existingCategory = categories.find(category => 
            category.name.toLowerCase() === description.toLowerCase()
        );


        if (existingCategory) {
            // Use the existing category type and proceed with saving
            await handleSaveCategory(existingCategory.type, amountValue);
        } else {
            // Show popup to select the type
            setShowPopup(true);
        }
    };

    const handleSaveCategory = async (type) => {
        setSelectedType(type);
        const amountValue = parseFloat(amount);

        if (type === 'Necessity' && amountValue > budget.currentNecessities) {
            const remainingNecessity = amountValue - budget.currentNecessities;
            if (remainingNecessity > budget.currentSavings) {
                setShowInsufficientSavingsPopup(true);
            } else {
                setShowInsufficientFundsPopup(true);
            }
        } else if (type === 'Want' && amountValue > budget.currentWants) {
            const remainingWant = amountValue - budget.currentWants;
            if (remainingWant > budget.currentSavings) {
                setShowInsufficientSavingsPopup(true);
            } else {
                setShowInsufficientFundsPopup(true);
            }
        } else {
            await saveCategory(type, amountValue);
            window.location.reload();
        }

        setShowPopup(false);
    };

    const saveCategory = async (type, amountValue) => {
        const url = 'http://localhost:4000/api/v1/income/addCategory';
        const token = sessionStorage.getItem("token");
        const data = {
            categoryName: description,
            type: type,
            amount: amountValue,
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token ? `${token}` : "",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to add category.');
            }

            // Assuming the expense should be added to the expenses list after saving to the backend
            onAddExpense({ description, amount: amountValue, category: type });

            // Fetch updated budget data
            const updatedBudgetResponse = await fetch("http://localhost:4000/api/v1/income/get", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token ? `${token}` : "",
                },
            });

            if (!updatedBudgetResponse.ok) {
                throw new Error("Failed to fetch updated budget data");
            }

            const updatedBudgetData = await updatedBudgetResponse.json();
            setBudget(updatedBudgetData.income);

        } catch (error) {
            console.error('Error adding category:', error);
            // Handle error as needed
        }

        setDescription('');
        setAmount('');
        setError('');
    };

    const handleInsufficientFundsConfirm = async () => {
        const amountValue = parseFloat(amount);
        await saveCategory(selectedType, amountValue);
        setShowInsufficientFundsPopup(false);
        window.location.reload();
    };

    const handleInsufficientFundsCancel = () => {
        setShowInsufficientFundsPopup(false);
    };

    const handleInsufficientSavingsClose = () => {
        setShowInsufficientSavingsPopup(false);
    };

    return (
        <div className='expenseForm'>
      
            <form onSubmit={handleSubmit}>
                <div className='newexpense'>
                    <input
                        className='amount'
                        type="number"
                        
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount"
                        required
                    />
                      <select
        className='att'
   
        onChange={(e) => setDescription(e.target.value)}
        required
    >
        <option value="" disabled selected>Select a category</option>
        {descriptionItems.map((descriptionItems,index) => (
            <option key={index} value={descriptionItems.name}>
                {descriptionItems.name}
            </option>
        ))}
    </select>
                </div><br></br>
                <button type="submit">Add Expense</button>
            </form>
            <h2>Add other Items</h2>
            <div className="underline"></div>
            <form onSubmit={handleSubmit}>
                <div className='newexpense'>
                    <input
                        className='amount'
                        type="number"
                        
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount"
                        required
                    />
                    <input
                        className='amount'
                        type="text"
                        
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        required
                    />
                </div><br></br>
                <button type="submit">Add Expense</button>
            </form>

            {showPopup && (
                <ExpensePopup
                    newExpense={{ description }}
                    onSave={handleSaveCategory}
                />
            )}

            {showInsufficientFundsPopup && (
                <InsufficientFundsPopup
                    onConfirm={handleInsufficientFundsConfirm}
                    onCancel={handleInsufficientFundsCancel}
                />
            )}

            {showInsufficientSavingsPopup && (
                <InsufficientSavingsPopup
                    onClose={handleInsufficientSavingsClose}
                />
            )}
        </div>
    );
};

export default ExpenseForm;

