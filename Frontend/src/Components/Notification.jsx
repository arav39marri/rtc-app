import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const backendUrl = process.env.REACT_APP_API_URL;
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
     console.log(parsedUser);
     console.log(localStorage);
    if (!parsedUser) {
        navigate('/'); 
    }
}, [navigate]);

  useEffect(() => {
    const useremail = JSON.parse(localStorage.getItem('user'));
      axios.post(`${backendUrl}`+'/notification',{
        useremail
      })
          .then((res) => {
              console.log("API response:", res.data); 
              setData(res.data);
          })
          .catch((error) => {
              console.error("Error fetching history:", error);
          });
  }, []);

  return (
    <div  >
      <Navbar/>
    <div className='flex-row gap-6 h-screen  '>
     
    {data.map((element, index) => (
     <div className='flex gap-5  p-5 items-center justify-center '>
      <div className='bg-slate-100 p-10'  >
      <p className='text-lg' >{element.message}</p>
      </div>
      
     </div>
))}
     
  
   </div>
   <Footer/>
   </div>
  )
}

export default Notification
