import React from "react";

const Ticket = ({ uname, bookedAt, departure, destination, passengers, date, time }) => {
  // console.log(uname) ;
  return (

    <div className="flex items-center justify-center min-w- md:text-lg text-sm overflow-hidden ">
      <div className="bg-slate-300 border-2 border-black rounded-lg md:p-3 p-2 shadow-lg">
        <div className="flex justify-between items-center m-2">
          <h1 className="md:text-2xl sm:text-sm font-bold text-black">BUS TICKET</h1>
          <div className="flex space-x-2">
            <span className="w-5 h-5 bg-black rounded-full"></span>
            <span className="w-5 h-5 bg-black rounded-full"></span>
          </div>
        </div>

        <div className="flex justify-between">
          {/* Left Section */}
          <div className="w-3/5">
            <p className="md:text-lg sm:text-sm font-bold text-black">
              DEPARTURE: <span className="font-normal">{departure}</span>
            </p>
            <p className="md:text-lg sm:text-sm font-bold text-black">
              DESTINATION: <span className="font-normal">{destination}</span>
            </p>
            <p className="md:text-lg sm:text-sm font-bold text-black">
              PASSENGERS: <span className="font-normal">{passengers}</span>
            </p>
            <div className="mt-8">
              <img
                src="image.png"
                alt="Barcode"
                className="w-32"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="w-2/5 border-l-2 border-black pl-4">
            <p className="md:text-lg sm:text-sm font-bold text-black">
              NAME: <span className="font-normal">{uname}</span>
            </p>
            <p className="md:text-lg sm:text-sm font-bold text-black">
              DATE: <span className="font-normal">{date}</span>
            </p>
            <p className="md:text-lg sm:text-sm font-bold text-black">
              TIME: <span className="font-normal">{time}</span>
            </p>
            <p className="md:text-lg sm:text-sm font-bold text-black">
              BOOKED AT: <span className="font-normal">{bookedAt}</span>
            </p>
            <div className="mt-8">
              <img
                src="barcode.png"
                alt="Barcode"
                className="w-32"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
