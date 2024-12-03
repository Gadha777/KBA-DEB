import React , { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import img1 from '../assets/Backgrounds/backgroundimg/rt11.jpg'
// import imagePath from '../assets/Backgrounds/dishes/1.jpg';
import Navbar from '../components/Navbar';
// import getUserType from '../Utils/Auth';

const Addmenu = () => {

    // console.log( "try",userType);
    const [dishname, setDishname] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();
  const Addmenu = async (e) => {
    e.preventDefault();
    const addmenus = {
      dishname,
      description,
      price
    };

    

    try {
        const res = await fetch('/api/adddish', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(addmenus),
          credentials: 'include',
        });
        if (res.status===200) {
            alert('added to menu successfully!');
            console.log('added to menu successfully!');
            navigate('/home');
          } else {
            const errorData = await res.json();
            alert(errorData.message );
          }
        } catch (error) {
          alert('An unexpected error occurred!');
        }
   
}
  return (
    <>
    <Navbar />
    <div className=" bg-center bg-no-repeat min-h-screen flex items-center justify-center bg-cover bg-fixed mt-[-500px] "  style={{ backgroundImage: `url(${img1 })` }}>
    <div className="w-full mt-[600px] max-w-md p-8 bg-white/80 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-red-900 mb-6">Add New Dish</h2>
      <form onSubmit={Addmenu} className="space-y-4 mt-[10px]">
        <div>
          <label htmlFor="dishname" className="block text-xl font-medium text-red-900">Dish Name</label>
          <input
            type="text"
            id="dishname"
            name="dishname"
            value={dishname}
            onChange={(e)=>setDishname(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter dish name"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-xl font-medium text-red-900">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter dish description"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-xl font-medium text-red-900">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-black-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter price"
            min="0"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-900 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
        >
          Add Dish
        </button>
      </form>
    </div>
  </div>
   </>
  )
}

export default Addmenu