import React, { useEffect,useState } from "react";
import Navbar from "../components/Navbar";
import imagePath from '../assets/Backgrounds/dishes/2.jpg';
import imagePath2 from '../assets/Backgrounds/backgroundimg/6.jpg';
import imagePath3 from '../assets/Backgrounds/dishes/19.jpg';
import imagePath4 from '../assets/Backgrounds/dishes/pancake.jpeg';
import imagePath6 from '../assets/Backgrounds/dishes/sand.jpeg';
import imagePath5 from '../assets/Backgrounds/dishes/Cappuccino.webp';
import Footer from "../components/Footer";

const Menu = () => {
  const [menus, setMenus] = useState([]); // Single object or null

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch(`/api/allmenu`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          
          // Ensure data is an array
          if (Array.isArray(data)) {
            setMenus(data);
          } else {
            console.error('Expected an array, but received:', data);
            setMenus([]);
          }
        } else {
          console.error('Failed to fetch menus:', response.statusText);
          setMenus([]);
        }
      } catch (error) {
        console.error('Error fetching menus:', error);
        setMenus([]);
      }
    };
  
    fetchMenus();
  }, []);
  return (
   <>
  
       <div className="bg-cover bg-no-repeat mt-[-70px] bg-fixed"style={{ backgroundImage: `url(${imagePath})` }}> 
      <div className="pt-[70px]">
      <Navbar />
      </div>
      <div>
        {/* Header Section */}
        <div>
          <p className="text-white text-3xl font-bold text-center font-[Caveat] mt-14">
            We Offers You
          </p>
          <p className="text-white text-8xl font-bold text-center font-[Caveat] mt-6">
            Fresh & Tasty Meals
          </p>
          <p className="text-center text-white text-3xl font-[Caveat] mt-4">
            Epicure has the perfect place to enjoy fine with <br />
            excellent service in comfortable atmospheric surroundings
          </p>
        </div>
        <p className="text-center text-white text-4xl mt-4">
          <a href="#white">Our Menu</a>
        </p>
      </div>

      {/* Menu Section */}
      <div id="white" className="bg-white h-[1000px] mt-20">
        <p className="text-center text-4xl pt-20 font-['Merriweather']">
          Taste The Best
        </p>
        <p className="text-center text-5xl mt-6 font-['Merriweather']">
          Discover Our Menu
        </p>
        <p className="text-center mt-10 text-3xl font-['Allura']">
          Even if you're not a great chef, there's nothing to stop you
          understanding the <br />
          difference between what tastes good and what doesn't.
        </p>

{/* <!-- 2nd menu --> */}
<div className="bg-white flex pb-22 ">
   
   <div className="text-orange-400 py-10 pl-6 ml-[300px] mr-10 mb-20 mt-20 border-2 border-orange-700 w-[700px] font-['Farsan'] text-2xl">
 {menus ? (
   menus.map((menu) => (
     <div key={menu._id} className="border-b-2 border-dashed border-orange-500 mr-10">
       <div className="flex relative  m-4">
         <p className="font-bold text-3xl text-black font-[Kalam]">{menu.dishname}</p>
         <p className=" ml-[400px]  font-[Kalam]">RS {menu.price}</p>
       </div>
       <p className="font-[Kalam] ml-4 w-[240px]">{menu.description}</p> {/* Fixed typo here */}
     </div>
   ))
 ) : (
   <p className="text-center text-xl text-gray-500">No reservations found</p>
 )}
</div>

        
   </div>
     {/* <!-- another menu --> */}
     <div className="h-[300px] bg-[url('/backgroundimg/6.jpg')] bg-cover bg-no-repeat  pb-[50px]"style={{ backgroundImage: `url(${imagePath2})` }} >
<p className="backdrop-blur-sm h-[300px] text-7xl text-white text-center pt-24 font-[Caveat]">We Serve Quality Food <br/> Explore</p>
</div>


        {/* First Menu */}
        <div className="flex ml-14 mt-10 ">
          {/* Dish 1 */}
          <div className="flex p-2 border-2 border-black">
            <div>
              <img
                className="h-[250px] w-[250px]  bg-cover"
                src="/dishes/19.jpg"
                style={{ backgroundImage: `url(${imagePath3})` }}
              />
            </div>
            <div className="text-center w-[300px] mt-6 ">
              <p className="text-3xl mb-4">Rs.150</p>
              <p className="font-semibold text-4xl">Healthy Breakfast</p>
              <p className="mt-4 text-xl">Oat granola with fresh blueberries, almond.</p>
            </div>
          </div>

          {/* Dish 2 */}
          <div className="flex ml-10 p-2 border-2 border-black">
          <div>
              <img
                className="h-[250px] w-[250px]  bg-cover"
                src="/dishes/pancake.jpeg"
                style={{ backgroundImage: `url(${imagePath4})` }}
              />
            </div>
            <div className="text-center w-[300px] mt-6">
              <p  className="text-3xl mb-4">Rs.150</p>
              <p className="font-semibold text-4xl">Traditional Pancakes</p>
              <p className="mt-4 text-xl">
                Pancakes with fresh strawberries and chocolate.
              </p>
            </div>
          </div>
        </div>

        {/* Second Menu */}
        <div className="flex ml-14 mt-10  mb-[150px]">
          <div className="flex p-2 border-2 border-black">
            <div className="text-center w-[300px] text-4xl mt-6">
              <p  className="text-3xl mb-4">Rs.100</p>
              <p className="font-semibold text-4xl">Cappuccino Coffee</p>
              <p className="mt-4 text-xl">Smooth and creamy Cappuccino Coffee.</p>
            </div>
            <div>
              <img
                className="h-[250px] w-[250px]  bg-cover"
                src="/dishes/Cappuccino.webp"
                
                style={{ backgroundImage: `url(${imagePath5})` }}

              />
            </div>
          </div>

          <div className="flex ml-10 p-2 border-2 border-black  ">
            <div className="text-center w-[300px] text-4xl mt-6">
              <p className="text-3xl mb-4">Rs.100</p>
              <p  className="font-semibold text-4xl">Salmon Sandwich</p>
              <p className="mt-4 text-xl">
                Salmon, butter, lemon juice, onion, garlic & salad.
              </p>
            </div>
            <div>
              <img
                className="h-[250px] w-[250px] bg-cover"
                src="/dishes/sand.jpeg"
                alt=""
                style={{ backgroundImage: `url(${imagePath6})` }}

              />
            </div>
          </div>
        </div>
      </div>
 
    </div>
    <br />
<div className="mt-[600px]">
<Footer/>
</div>
   </>
  );
};

export default Menu;
