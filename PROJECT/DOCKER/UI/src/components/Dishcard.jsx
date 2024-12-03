import React from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Dishcard = ({ dish }) => {
  const navigate = useNavigate(); // Add this line to use navigation

  const handleRemoveDish = async () => {
    if (window.confirm('Are you sure you want to remove this dish?')) {
      // try {
        const res = await fetch(`/api/deletemenu?dishname=${dish.dishname}`, {
          method: 'DELETE',
          //credentials:'include'
        });

        if (res.ok) {
          alert('Dish removed successfully');
          navigate('/home'); // Redirect to courses page
        } else {
          const errorData = await res.json();
          alert(errorData.message || 'Error removing dish');
        }
      // } catch (error) {
      //   console.log('Error removing dishes:', error);
      //   alert('An error occurred. Please try again.');
      // }
    }
  };

  return (
    <div className="dish-card bg-white/80 shadow-lg mt-[80px]  rounded-lg bg-cover overflow-hidden max-w-xs mx-auto mb-6"  >
      <div className="dish-card-header p-6">
        <h2 className="text-xl font-semibold text-center underline underline-offset-8 text-red-900">{dish.dishname}</h2>
      </div>
      <div className="dish-card-body px-6 pb-6 text-center">
        <p className="text-red-900 font-bold text-xl">{dish.description}</p>
        <p className="text-red-900 font-bold mt-4">Price: <span className="font-bold">{dish.price}</span></p>
      </div>
      <div className="dish-card-footer px-6 pb-6 flex justify-between">
        <Link to={`/updatemenu/${dish.dishname}`} className="bg-red-900 text-white px-2 h-[40px]  w-[110px] text-[16px] py-2 font-normal rounded-lg hover:bg-green-600 transition">Update Dish</Link>
        <button onClick={handleRemoveDish} className="bg-red-900 text-white px-2 py-2 rounded-lg h-[40px] ml-[20px] text-[14px]  w-[110px] hover:bg-red-600 transition">Remove Dish</button>
      </div>
    </div>
  );
};

export default Dishcard;
