import React, { useState, useEffect } from 'react';
import axios from 'axios';

const History = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:2000/history")
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
          <div className='flex gap-5  p-5 '>
            <p key={index}>{element.name}</p> 
            <p> {element.destination} </p>
            <p> {element.departure} </p>
            <p> {element.time} </p>
          </div>
    ))}
          
       
        </div>
    );
};

export default History;
