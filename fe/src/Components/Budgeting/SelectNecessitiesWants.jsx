// src/pages/SelectNecessitiesWants.js
import React, { useEffect, useState } from "react";
import SelectItems from "./SelectItems";
import { useNavigate } from "react-router-dom";
import "./selectNecessitiesWants.css";

const SelectNecessitiesWants = ({ onItemsSubmit }) => {
  const [items, setItems] = useState([]);
  const [necessities, setNecessities] = useState([]);
  const [wants, setWants] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = sessionStorage.getItem("token");

        const response = await fetch("http://localhost:4000/api/v1/categories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();

        const necessities = [];
        const wants = [];
        const items = [];

        data.categories.forEach((category) => {
          const item = {
            id: category._id,
            name: category.name,
            type: category.type,
          };
          if (category.type === "Necessity") {
            necessities.push(item);
          } else if (category.type === "Want") {
            wants.push(item);
          } else {
            items.push(item);
          }
        });

        setNecessities(necessities);
        setWants(wants);
        setItems(items);
      } catch (error) {
        console.error("API call error:", error);
        setError("Failed to fetch categories. Please try again.");
      }
    };

    fetchCategories();
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    let sourceList, setSourceList, destinationList, setDestinationList;

    switch (source.droppableId) {
      case "items":
        sourceList = items;
        setSourceList = setItems;
        break;
      case "necessities":
        sourceList = necessities;
        setSourceList = setNecessities;
        break;
      case "wants":
        sourceList = wants;
        setSourceList = setWants;
        break;
      default:
        return;
    }

    switch (destination.droppableId) {
      case "items":
        destinationList = items;
        setDestinationList = setItems;
        break;
      case "necessities":
        destinationList = necessities;
        setDestinationList = setNecessities;
        break;
      case "wants":
        destinationList = wants;
        setDestinationList = setWants;
        break;
      default:
        return;
    }

    const [movedItem] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, movedItem);

    setSourceList([...sourceList]);
    setDestinationList([...destinationList]);
  };


  const handleDone = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await fetch(
          "http://localhost:4000/api/v1/income/addManyCat",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            body: JSON.stringify({
              categories: [
                ...necessities.map((item) => ({
                  name: item.name,
                  type: "Necessity", // Ensure you set the correct type here
                })),
                ...wants.map((item) => ({
                  name: item.name,
                  type: "Want", // Ensure you set the correct type here
                })),
              ],
            }),
          }
      );

      if (!response.ok) {
        throw new Error("Failed to submit categories");
      }

      // Assuming the response contains updated data or success message
      const data = await response.json();
      console.log("Successfully submitted:", necessities, wants);

      // Trigger the callback to navigate to the next page
      onItemsSubmit({ necessities, wants });
      navigate("/budget");
    } catch (error) {
      console.error("API call error:", error);
      setError("Failed to submit categories. Please try again.");
    }
  };


  return (
      <div className="selectionContent">
        <h2>Select Necessities and Wants</h2>
        <div className="underline"></div>
        <p>
          <span>Necessities</span> are expenses that you can't avoid—payments for
          all the essentials that would be difficult to live without. (For
          example: Housing, Transportation, Insurance, Gas and electricity, Food.)
          <br></br>
          <span>Wants</span> are defined as non-essential expenses—things that you
          choose to spend your money on, although you could live without them if
          you had to. (For example: Travel, Entertainment, Designer clothing, Gym
          memberships, Coffeehouse drinks.)
        </p>
        <SelectItems
            items={items}
            necessities={necessities}
            wants={wants}
            onDragEnd={handleDragEnd}
        />
        <button onClick={handleDone}>Done</button>
      </div>
  );
};

export default SelectNecessitiesWants;
