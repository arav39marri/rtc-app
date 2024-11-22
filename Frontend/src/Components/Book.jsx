import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Try from "./Try";
import Busstops from "./Busstops"; // Import Bus stops
import data from './data.json' // bus data and prices are imported 
import Test from './Test'

export default function Book() {
  const [Firstname, setFirstName] = useState("");
  const [Secondname, setSecondName] = useState("");
  const [departur, setdeparture] = useState("");
  const [destinatin, setDestination] = useState("");
  const [passenger, setPass] = useState(1);
  const [filteredDepartures, setFilteredDepartures] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [BookLoad, setLoad] = useState(false);
  const navigate = useNavigate();
  const [busFound, setBusFound] = useState(false);
  const [busFare, setBusFare] = useState(null);
  const [Fare , SetFare] = useState (10) ;

  const [busfound, setbusfound] = useState("");


  const busStops = Busstops; 

  // Handle dynamic suggestions for departure
  const handleDepartureChange = (e) => {
    const value = e.target.value;
    setdeparture(value);
    if (value) {
      setFilteredDepartures(
        busStops.filter((stop) =>
          stop.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredDepartures([]);
    }
  };

  // Handle dynamic suggestions for destination
  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);
    if (value) {
      setFilteredDestinations(
        busStops.filter((stop) =>
          stop.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredDestinations([]);
    }
  };

  const handleDepartureSelect = (stop) => {
    setdeparture(stop);
    setFilteredDepartures([]);
  };

  const handleDestinationSelect = (stop) => {
    setDestination(stop);
    setFilteredDestinations([]);
  };


  const searchBus = () => {
    const buses = data[departur] || [];
    const destinationBus = buses.find(
      (bus) => bus.destination.toLowerCase() === destinatin.toLowerCase()
    );
  
    if (destinationBus) {
      setBusFound(true);
      setBusFare(destinationBus.price);
      const calculatedFare = destinationBus.price * passenger;
      SetFare(calculatedFare);
      setbusfound("Bus found! Fare: ")
    } else {
      setBusFound(false);
      setBusFare(null);
      setbusfound("bus not found");
    }
  };
  
  const submit = async (e) =>{
    console.log("want to submit ");
  }

  const abc = async (e) => {
    setLoad(true);
    e.preventDefault();
    const username = JSON.parse(localStorage.getItem("user"));
    const currentDate = new Date();
    const dt = `${String(currentDate.getDate()).padStart(2, "0")}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${currentDate.getFullYear()}`;
    const tme = `${String(currentDate.getHours()).padStart(2, "0")}:${String(
      currentDate.getMinutes()
    ).padStart(2, "0")}:${String(currentDate.getSeconds()).padStart(2, "0")}`;

    try {
      await axios.put("https://rtc-app-bayg.onrender.com/createticket", {
        name: username,
        uname: Firstname,
        destination: destinatin,
        departure: departur,
        passengers: passenger,
        date: dt,
        time: tme,
      });
      navigate("/History");
    } catch (error) {
      alert("Error booking ticket. Please try again.");
      console.error(error);
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={submit} method="POST">
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="fName"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="fName"
                    id="fName"
                    placeholder="First Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="lName"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lName"
                    id="lName"
                    placeholder="Last Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    onChange={(e) => setSecondName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2 relative">
                <div className="mb-5">
                  <label
                    htmlFor="departure"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    From
                  </label>
                  <input
                    type="text"
                    name="departure"
                    id="departure"
                    placeholder="Enter departure location"
                    value={departur}
                    onChange={handleDepartureChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                  {filteredDepartures.length > 0 && (
                    <ul className="absolute bg-white border border-gray-300 w-full mt-2 rounded-md shadow-lg z-10">
                      {filteredDepartures.map((stop, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleDepartureSelect(stop)}
                        >
                          {stop}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2 relative">
                <div className="mb-5">
                  <label
                    htmlFor="destination"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    To
                  </label>
                  <input
                    type="text"
                    name="destination"
                    id="destination"
                    placeholder="Enter destination location"
                    value={destinatin}
                    onChange={handleDestinationChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                  {filteredDestinations.length > 0 && (
                    <ul className="absolute bg-white border border-gray-300 w-full mt-2 rounded-md shadow-lg z-10">
                      {filteredDestinations.map((stop, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleDestinationSelect(stop)}
                        >
                          {stop}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="guest"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                No of passengers
              </label>
              <input
                type="number"
                name="guest"
                id="guest"
                placeholder="1"
                min="1"
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                onChange={(e) => setPass(e.target.value)}
                required
              />
            </div>
            {/* <div className="flex gap-3 ">
              <button
                type="submit"
                disabled={BookLoad}
                className="hover:shadow-form rounded-md bg-blue-700 py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                {BookLoad ? "Searching..." : "Search Buses"}
              </button>
              <div>
                <p>this is to show buses found or not</p>
              </div>
            </div> */}
            <div className="flex gap-3">
                <button
                  type="button"
                  onClick={searchBus}
                  className="hover:shadow-form rounded-md bg-blue-700 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                >
                  {BookLoad ? "Searching..." : "Search Buses"}
                </button>
                <div>
                  {busFound ? (
                    <p className="text-green-500">{busfound} {busFare*passenger}</p>
                  ) : (
                    <p className="text-red-500">{busfound}</p>
                  )}
                </div>
              </div>

              <div className="mt-2">
                {/* <button
                  type="button"
                  disabled={!busFound}
                  className={`hover:shadow-form rounded-md py-3 px-8 text-center text-base font-semibold text-white outline-none ${
                    busFound ? "bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Pay Now
                </button> */}
              </div>
            <Test 
            busFound={busFound}
               name= {""}
               uname= {Firstname}
               destination= {destinatin}
               departure= {departur}
               passengers= {passenger}
               Fare = {busFare*passenger}
               date= {0}
               time={0}
            
            />
            
          </form>
        </div>
      </div>
     
      <Footer />
    </div>
  );
}
