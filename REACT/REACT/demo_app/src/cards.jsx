import { useState } from "react";

const Card=({customClasses})=>{
    const [likes,setLikes]=useState(0);
    const [titlecolor, setTitleColor]=useState('text-black');

    const toggleTitleColor=()=>{
        setTitleColor((prevcolor)=>
            prevcolor==='text-black'?'text-blue-500':'text-black'
    );
    }
    return (
        <div className={`max-w-sm rounded overflow-hidden shodow-lg p-6 bg-white ${customClasses}`}>
            <h1 className={`font-bold text-xl  mb-2 ${titlecolor}`}>Card Title</h1>
            <p>this is an example text in the card</p>
            <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-black" onClick={()=>setLikes(likes+1)}>Likes:{likes}</button>
            <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-green-700 " onClick={toggleTitleColor}>Toggle the TitleColor</button>

        </div>
    )
}
export default Card;