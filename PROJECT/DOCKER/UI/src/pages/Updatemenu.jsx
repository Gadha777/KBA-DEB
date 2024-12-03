import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import img1 from '../assets/Backgrounds/backgroundimg/slider.jpg'


const Updatemenu = () => {
  const { dishname } = useParams();
  const navigate = useNavigate();
  const [dish, setDish] = useState({
    dishname: '',
    description: '',
    price: '',
  });
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const res = await fetch(`/api/allmenu/${dishname}`);
        if (!res.ok) {
          throw new Error('Dish not found');
        }
        const data = await res.json();
        console.log('Fetched data:', data);

        // Check if data is an array and find the relevant dish
        if (Array.isArray(data) && data.length > 0) {
          const selectedDish = data.find(dish => dish.dishname === dishname);
          if (selectedDish) {
            setDish(selectedDish);  // Set the selected dish data
          } else {
            setError('Dish not found in the array');
          }
        } else {
          setError('No data found');
        }
        setIsLoading(false); // Stop loading once data is fetched
      } catch (error) {
        setError(error.message); // Set error if fetching fails
        setIsLoading(false);
      }
    };

    fetchDish();
  }, [dishname]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDish((prevDish) => ({
      ...prevDish,
      [name]: value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/updatemenu/${dishname}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dish),
      });
      if (res.ok) {
        alert('Dish updated successfully');
        navigate('/adminmenu');
      } else {
        alert('Failed to update dish');
      }
    } catch (error) {
      console.error('Error updating dish:', error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="mb-20 bg-cover" style={{ backgroundImage: `url(${img1 })` }}>
      <div className="container m-auto max-w-2xl py-2">
        <div className=" px-6 py-8 mb-4 shadow-md bg-white/80  rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-red-800 text-center font-semibold mb-6">
              Update Dish
            </h2>

            <div className="mb-4">
              <label className="block text-red-900 font-bold mb-2">
                Dish Name
              </label>
              <input
                type="text"
                name="dishname"
                className="border rounded w-full py-2 px-3 mb-2"
                value={dish.dishname || ''} 
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-red-900 font-bold mb-2">
                Description
              </label>
              <textarea
                name="description"
                className="border rounded w-full py-2 px-3"
                rows="4"
                value={dish.description || ''} 
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-red-900 font-bold mb-2">
                Price
              </label>
              <input
                type="text"
                name="price"
                className="border rounded w-full py-2 px-3"
                value={dish.price || ''} 
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="bg-red-900 hover:bg-red-800 my-10 text-white font-bold py-2 px-4 rounded-full w-full"
              type="submit"
            >
              Update Dish
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Updatemenu;
