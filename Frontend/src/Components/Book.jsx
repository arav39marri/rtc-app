import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import data from "./data.json"; // Import your JSON data for locations

export default function Book() {
  const [Firstname, setFirstName] = useState("");
  const [Secondname, setSecondName] = useState("");
  const [departur, setdeparture] = useState("");
  const [destinatin, setDestination] = useState("");
  const [passenger, setPass] = useState("");
  const [dat, setdate] = useState("");
  const [tim, setTime] = useState("");
  const [filteredDepartures, setFilteredDepartures] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_API_URL;
  const [in1,setin1] = useState(true) ;
  const [in2,setin2] = useState(true) ;

  // Prepare locations from the data.json
  const allLocations = data.map(route => ({
    start: route.start,
    stops: route.stops.split(", ").map(stop => stop.trim()),
  }));

  useEffect(() => {
    // Filter departure locations based on user input
    setin1(true);
    setin2(true);
    if (departur) {
      const filteredStarts = allLocations.filter(route =>
        route.start.toLowerCase().includes(departur.toLowerCase())
      );
      setFilteredDepartures(filteredStarts.map(route => route.start));
    } else {
      setFilteredDepartures([]);
      setin1(false);
    }

    // Filter destination locations based on user input
    if (destinatin) {
      const allStops = allLocations.flatMap(route => route.stops);
      const filteredStops = [...new Set(allStops)].filter(stop =>
        stop.toLowerCase().includes(destinatin.toLowerCase())
      );
      setFilteredDestinations(filteredStops);
    } else {
      setFilteredDestinations([]);
      setin2(false) ;
    }
  }, [departur, destinatin]);

  const handleDepartureSelect = (selectedDeparture) => {
    setdeparture(selectedDeparture);
    setFilteredDepartures([]); // Hide suggestions after selection
  };

  const handleDestinationSelect = (selectedDestination) => {
    setDestination(selectedDestination);
    setFilteredDestinations([]); // Hide suggestions after selection
  };

  const submit = async (e) => {
    e.preventDefault();
    const username = JSON.parse(localStorage.getItem('user'));
    const currentDate = new Date();
    const dt = `${String(currentDate.getDate()).padStart(2, '0')}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${currentDate.getFullYear()}`;
    const tme = `${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;

    try {
      await axios.put(`${backendUrl}/createticket`, {
        name: username,
        destination: destinatin,
        departure: departur,
        passengers: passenger,
        date: dt,
        time: tme,
      });
      navigate('/History');
    } catch (error) {
      alert("Error booking ticket. Please try again.");
      console.error(error);
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
                  <label htmlFor="fName" className="mb-3 block text-base font-medium text-[#07074D]">
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
                  <label htmlFor="lName" className="mb-3 block text-base font-medium text-[#07074D]">
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
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label htmlFor="fName" className="mb-3 block text-base font-medium text-[#07074D]">
                    From
                  </label>
                  <input
                    type="text"
                    name="fName"
                    id="fName"
                    placeholder="Enter departure Location"
                    value={departur}
                    onChange={(e) => setdeparture(e.target.value)}
                    required
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                  {departur && filteredDepartures.length > 0 && in1 && (
                    <ul className="mt-2 max-h-40 overflow-y-auto rounded-md border border-[#e0e0e0] bg-white">
                      {filteredDepartures.map((start, index) => (
                        <li
                          key={index}
                          className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleDepartureSelect(start)}
                        >
                          {start}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label htmlFor="lName" className="mb-3 block text-base font-medium text-[#07074D]">
                    To
                  </label>
                  <input
                    type="text"
                    name="lName"
                    id="lName"
                    placeholder="Enter destination Location"
                    value={destinatin}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                  {destinatin && filteredDestinations.length > 0 && in2 && (
                    <ul className="mt-2 max-h-40 overflow-y-auto rounded-md border border-[#e0e0e0] bg-white">
                      {filteredDestinations.map((stop, index) => (
                        <li
                          key={index}
                          className="cursor-pointer px-4 py-2 hover:bg-gray-100"
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
              <label htmlFor="guest" className="mb-3 block text-base font-medium text-[#07074D]">
                No of passengers
              </label>
              <input
                type="number"
                name="guest"
                id="guest"
                placeholder="1"
                min="0"
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                onChange={(e) => setPass(e.target.value)}
                required
              />
            </div>
            <div>
              <button type="submit" className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Book Ticket
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
