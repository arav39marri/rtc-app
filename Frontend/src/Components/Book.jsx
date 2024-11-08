  import React from "react"
  import { useState } from "react"
  import axios from 'axios';
  import { useNavigate } from "react-router-dom";

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

    try{
      axios.put("http://localhost:2000/createticket", {
        name: Firstname,
        destination: destinatin,
        departure: departur,
        passengers: passenger,
        date:dat,
        time: tim
    })
    .then(response => {
      navigate('/History')
        console.log("Ticket booked successfully:", response.data);
    })
    .catch(error => {
        console.error("Error booking ticket:", error);
    });
    }
    catch(error){
    
    }

  }
  


  return (
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
            type="number"
            name="guest"
            id="guest"
            placeholder="1"
            min="0"
            class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
  
        <div class="-mx-3 flex flex-wrap">
          <div class="w-full px-3 sm:w-1/2">
            <div class="mb-5">
              <label
                for="date"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                onChange={(e)=> setdate(e.target.value)}
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div class="w-full px-3 sm:w-1/2">
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
          </div>
        </div>
  
       {/*   <div class="mb-5">
          <label class="mb-3 block text-base font-medium text-[#07074D]">
            Are you coming to the event?
          </label>
         <div class="flex items-center space-x-6"> 
            <div class="flex items-center">
              <input
                type="radio"
                name="radio1"
                id="radioButton1"
                class="h-5 w-5"
              />
              <label
                for="radioButton1"
                class="pl-3 text-base font-medium text-[#07074D]"
              >
                Yes
              </label>
            </div>
            <div class="flex items-center">
              <input
                type="radio"
                name="radio1"
                id="radioButton2"
                class="h-5 w-5"
              />
              <label
                for="radioButton2"
                class="pl-3 text-base font-medium text-[#07074D]"
              >
                No
              </label>
            </div>
          </div>
        </div>
          */}
  
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
  )
}