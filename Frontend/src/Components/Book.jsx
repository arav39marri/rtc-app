  import React from "react"
  import { useState } from "react"
  import axios from 'axios';
  import { useNavigate } from "react-router-dom";
  import Navbar from "./Navbar";
  import Footer from "./Footer";


  export default function Book() {
  
  const [Firstname , setFirstName] = useState("");
  const [Secondname , setSecondName] = useState("");
  const [departur , setdeparture] = useState("");
  const [destinatin , setDestination] = useState("");
  const [passenger, setPass] = useState("");
  const [dat, setdate] = useState("");
  const [tim , setTime] = useState("");
  const navigate = useNavigate();

  const submit = async (e)=>{
    e.preventDefault();
    const username = JSON.parse(localStorage.getItem('user'));
     const dateCurent = new Date();
    
      const currentDate = new Date();
      const dt = `${String(currentDate.getDate()).padStart(2, '0')}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${currentDate.getFullYear()}`;
      const tme = `${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
      console.log(dt) ;
      console.log(tme);

    try{
      axios.put("http://localhost:2000/createticket", {
        name: username,
        destination: destinatin,
        departure: departur,
        passengers: passenger,
        date:dt,
        time: tme
    })
    .then(response => {
      navigate('/History')
        // console.log("Ticket booked successfully:", response.data);
    })
    .catch(error => {
      alert("user not found please register or check your your name ")
        console.error("Error booking ticket:", error);
    });
    }
    catch(error){
    
    }

  }
  


  return (
    <div  className="h-screen">
      <Navbar/>
   
    <div class="flex items-center justify-center p-12">
         <div class="mx-auto w-full max-w-[550px]">
      <form onSubmit={submit}  method="POST">
      <div class="-mx-3 flex flex-wrap">
          <div class="w-full px-3 sm:w-1/2">
            <div class="mb-5">
              <label
                for="fName"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                First Name
              </label>
              <input
                type="text"
                name="fName"
                id="fName"
                placeholder="First Name"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              
            </div>
          </div>
          <div class="w-full px-3 sm:w-1/2">
          
            <div class="mb-5">
              <label
                for="lName"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Last Name
              </label>
              <input
              onChange={(e) => setSecondName(e.target.value)}
              required
                type="text"
                name="lName"
                id="lName"
                placeholder="Last Name"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
        </div>
        <div class="-mx-3 flex flex-wrap">
          <div class="w-full px-3 sm:w-1/2">
            <div class="mb-5">
              <label
                for="fName"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                From
              </label>
              <input
                onChange={(e) => setdeparture(e.target.value)}
                type="text"
                name="fName"
                id="fName"
                placeholder="Enter departure Location"
                required 
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div class="w-full px-3 sm:w-1/2">
            <div class="mb-5">
              <label
                for="lName"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
               To
              </label>
              <input
                onChange={(e) => setDestination(e.target.value)}
                type="text"
                name="lName"
                id="lName"
                placeholder="Enter destination Location"
                required 
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
        </div>
        <div class="mb-5">
          <label
            for="guest"
            class="mb-3 block text-base font-medium text-[#07074D]"
          >
            No of passengers
          </label>
          <input
          onChange={(e) => setPass(e.target.value)}
          required
            type="number"
            name="guest"
            id="guest"
            placeholder="1"
            min="0"
            class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
  
        <div class="-mx-3 flex flex-wrap">
          {/* <div class="w-full px-3 sm:w-1/2">
            <div class="mb-5">
              <label
                for="date"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Date
              </label>
              {dat}
              <input
                type="date"
                name="date"
                id="date"
                onChange={(e)=> setdate(e.target.value)}

                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div> */}
          {/* <div class="w-full px-3 sm:w-1/2">
            <div class="mb-5">
              <label
                for="time"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Time
              </label>
              <input
                type="time"
                name="time"
                id="time"
                onChange={(e)=>setTime(e.target.value)}
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div> */}
        </div>
  
        <div>
          <button  type="submit"
            class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
           
          >
            Book Ticket
          </button>
        </div>
      </form>
    </div>
  </div>
  <Footer/>
  </div>
  )
}