import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from "react-router-dom";
import Ticket from './Createuser';
import animation from './animation.json'
import { Player } from '@lottiefiles/react-lottie-player';

const History = () => {

  const backendUrl = 'https://rtc-app-bayg.onrender.com';

  const [data, setData] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null); // State for selected ticket details
  const navigate = useNavigate();
  const [animate , setAnimate] = useState(true) ;

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    if (!parsedUser) {
      navigate('/'); 
    }
  }, [navigate]);
  

  useEffect(() => {
    const useremail = JSON.parse(localStorage.getItem('user'));
    // console.log(useremail) ;
     setAnimate(true) ;
    // console.log('Backend URL:', backendUrl);
    try{
    // axios.post(`${backendUrl}/history`,{
    //   useremail
    // })
    axios.post('https://rtc-app-bayg.onrender.com/history',{
      useremail 
    })
      .then((res) => {
        console.log("API response:", res.data); 
        setData(res.data);
        setAnimate(false)
      })
      .catch((error) => {
        console.error("Error fetching history:", error);
      })
    }
    catch(error){


    }
    finally{
      setAnimate(true) ;
    }
    
      
  }, []);

  const formatDate = (timestamp) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(timestamp).toLocaleDateString(undefined, options);
  };

  const handleDetailsClick = (ticket) => {
    console.log(ticket) ;
    setSelectedTicket(ticket); // Set the selected ticket details
  };

  const closeModal = () => {
    setSelectedTicket(null); // Close the modal
  };

  return (
    <div className='h-screen' >
      <Navbar />
      {animate ? (<Player src={animation} loop className="player"  autoplay style={{ height: '300px', width: '300px' }}  />):(
      <div className="flex flex-col gap-6 w-full ">
        {data.map((element, index) => (
          <div key={index} className="flex gap-5 p-5 justify-center items-center">
            <div className="flex flex-col p-3 rounded-md md:w-[50%] w-[90%] cursor-pointer bg-slate-200">
              <p>{element.name}</p>
              <p className="lg:text-lg text-sm">Booked At: {formatDate(element.bookedAt)}</p>
              <span
                className="text-blue-600 hover:underline dark:text-blue-500 cursor-pointer"
                onClick={() => handleDetailsClick({
                  uname: element.uname,
                  bookedAt: formatDate(element.bookedAt),
                  departure: element.departure,
                  destination: element.destination,
                  passengers: element.passengers,
                  Fare : element.Fare,
                  date: element.date,
                  time: element.time,
                })}
              >
                Details
              </span>
            </div>
          </div>
        ))}

        {/* Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-lg p-6">
              <button
                className="absolute top-2 right-2 text-black font-bold text-lg"
                onClick={closeModal}
              >
                ×
              </button>
              <Ticket
                uname={selectedTicket.uname}
                bookedAt={selectedTicket.bookedAt}
                departure={selectedTicket.departure}
                destination={selectedTicket.destination}
                passengers={selectedTicket.passengers}
                Fare = {selectedTicket.Fare}
                date={selectedTicket.date}
                time={selectedTicket.time}
              />
            </div>
          </div>
        )}
      </div>
)}
      <Footer />
    </div>
  );
};

export default History;
