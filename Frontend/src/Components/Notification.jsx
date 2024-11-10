import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';

const Notification = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
      axios.get("http://localhost:2000/notification")
          .then((res) => {
              console.log("API response:", res.data); // Debug: Check the response data
              setData(res.data);
          })
          .catch((error) => {
              console.error("Error fetching history:", error);
          });
  }, []);

  return (
    <div className='flex-row gap-6   '>
     
    {data.map((element, index) => (
     <div className='flex gap-5  p-5 items-center justify-center '>
      <div className='bg-slate-100 p-10'  >
      <p className='text-lg' >{element.message}</p>
      </div>
      
     </div>
))}
     
  
   </div>
  )
}

export default Notification
