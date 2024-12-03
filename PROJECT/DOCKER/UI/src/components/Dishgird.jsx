import React, { useEffect, useState } from 'react';
import Dishcard from './Dishcard';



const Dishgird = () => {
  const [dishes, setDishes] = useState([]); // Initial state as an empty array

  // Fetch dishes from the backend API
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const res = await fetch('/api/allmenu'); // Adjust the API endpoint if necessary
        const data = await res.json();

        // Check if the data is an array and set it, else set to an empty array
        if (Array.isArray(data)) {
          setDishes(data);
        } else {
          setDishes([]); // If data isn't an array, set an empty array
        }
      } catch (error) {
        console.error('Error fetching dishes:', error);
        setDishes([]); // If there's an error, ensure dishes is empty
      }
    };

    fetchDishes();
  }, []); // Empty dependency array to run once on mount

  // Display loading message if data is being fetched
 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-cover  bg-fixed">
      {dishes.length > 0 ? (
        dishes.map((dish) => (
          <Dishcard key={dish.dishname} dish={dish} className="dish-card "/>
           
        ))
      ) : (
        <div>No dishes available</div> // Show this if dishes array is empty
      )}
    </div>
  );
};

export default Dishgird;
