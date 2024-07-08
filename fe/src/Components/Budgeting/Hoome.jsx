import React, { useState, useEffect } from "react";
import BudgetRule from "./BudgetRule";
import ExpenseForm from "./ExpenseForm";
import { useNavigate } from "react-router-dom";
import "./home.css";
import NavBlack from "../navbarBlack/NavBlack";

const Home = ({ onSalarySubmit }) => {
  const [expenses, setExpenses] = useState([]);
  const [selectedNecessities, setSelectedNecessities] = useState([]);
  const [selectedWants, setSelectedWants] = useState([]);
  const [budget, setBudget] = useState({
    necessities: 0,
    wants: 0,
    savings: 0,
    currentNecessities: 0,
    currentWants: 0,
    currentSavings: 0,
  });

  const navigate = useNavigate();

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
      const { necessities, wants, savings, currentNecessities, currentWants, currentSavings } = data.income;

      setBudget({ necessities, wants, savings, currentNecessities, currentWants, currentSavings });

      const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
      setExpenses(storedExpenses);
    } catch (error) {
      console.error("Error fetching budget data:", error);
    }
  };

  useEffect(() => {
    fetchBudgetData();
  }, []);

  useEffect(() => {
    const fetchNecessitiesAndWants = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const necessitiesResponse = await fetch(
            "http://localhost:4000/api/v1/getNecessity",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: token ? `${token}` : "",
              },
            }
        );

        const wantsResponse = await fetch(
            "http://localhost:4000/api/v1/getWant",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: token ? `${token}` : "",
              },
            }
        );

        const necessitiesData = await necessitiesResponse.json();
        const wantsData = await wantsResponse.json();

        if (necessitiesData.success && Array.isArray(necessitiesData.categories)) {
          setSelectedNecessities(necessitiesData.categories);
        } else {
          setSelectedNecessities([]);
        }

        if (wantsData.success && Array.isArray(wantsData.categories)) {
          setSelectedWants(wantsData.categories);
        } else {
          setSelectedWants([]);
        }
      } catch (error) {
        console.error("Failed to fetch necessities and wants", error);
      }
    };

    fetchNecessitiesAndWants();
  }, []);

  const handleSalarySubmit = (budgetData) => {
    setBudget(budgetData);
    onSalarySubmit(budgetData);
  };

  const handleAddExpense = (expense) => {
    const updatedExpenses = [...expenses, expense];
    setExpenses(updatedExpenses);

    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  return (
      <div>
        <NavBlack />
       <div className="top">
       <BudgetRule onSalarySubmit={handleSalarySubmit} />
        <div className="division">
          <h3>
            Current Necessities <span>₹{budget.currentNecessities}</span>
          </h3>
          <h3>
            Current Wants <span>₹{budget.currentWants}</span>
          </h3>
          <h3>
            Current Savings <span>₹{budget.currentSavings}</span>
          </h3>
        </div>

        <div className="step2">
          <h2>Categorize your spending into Necessities and Wants.</h2>
          <div className="underline"></div>
          <button onClick={() => navigate("/select-necessities-wants")}>
            Select Necessities and Wants
          </button>
        </div>

        <div className="selectedResult">
          <div>
            <h3>Selected Necessities</h3>
            <select>
              {selectedNecessities.map((item, index) => (
                  <option key={index}>{item.name}</option>
              ))}
            </select>
          </div>
          <div>
            <h3>Selected Wants</h3>
            <select>
              {selectedWants.map((item, index) => (
                  <option key={index}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="step3">
          <h2>Keep a record of your Expenses.</h2>
          <div className="underline"></div>
          <ExpenseForm onAddExpense={handleAddExpense} />

          <ul>
            {expenses.map((expense, index) => (
                <li key={index}>
                  {expense.description}: ₹{expense.amount.toFixed(2)} (
                  {expense.category})
                </li>
            ))}
          </ul>
        </div>
        <div className="step4">
          <h2>Evaluate and analyze your spending.</h2>
          <div className="underline"></div>
          <button onClick={() => navigate("/report")}>
            Your Monthly Reports
          </button>
        </div>
       </div>
      </div>
  );
};

export default Home;
