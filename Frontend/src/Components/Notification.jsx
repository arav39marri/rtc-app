import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from "react-router-dom";
import animation from './animation.json'
import { Player } from '@lottiefiles/react-lottie-player';

const Notification = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [animate , setAnimate] = useState(true) ;
  const backendUrl = 'https://rtc-app-bayg.onrender.com';
  
  useEffect(() => {
    // console.log('Backend URL:', backendUrl);
    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    //  console.log(parsedUser);
    //  console.log(localStorage);
    if (!parsedUser) {
        navigate('/'); 
    }
}, [navigate]);

  useEffect(() => {
    setAnimate(true) ;
    const useremail = JSON.parse(localStorage.getItem('user'));
      axios.post(`${backendUrl}/notification`,{
        useremail
      })
          .then((res) => {
              // console.log("API response:", res.data); 
              setAnimate(false);
              setData(res.data);
          })
          .catch((error) => {
            setAnimate(false);
              console.error("Error fetching history:", error);
          });
  }, []);

  return (
    <div  >
      <Navbar/>
     
    { animate?(<Player src={animation} loop className="player"  autoplay style={{ height: '300px', width: '300px' }}  />) :(
            <div className='flex flex-col md:gap-3 gap-1   '>
     
            {data.map((element, index) => (
             <div className='flex gap-2  p-5 items-center justify-center '>
              <div className='bg-slate-100 md:p-10 p-6 rounded-xl '  >
              <p className='text-lg' >{element.message}</p>
              </div>
              
             </div>
        ))}
           </div>
    )}
   
   <Footer/>
   </div>
  )
}

export default Notification
