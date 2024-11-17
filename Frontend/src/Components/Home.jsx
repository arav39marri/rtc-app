import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
     console.log(parsedUser);
     console.log(localStorage);
    if (!parsedUser) {
        navigate('/'); 
    }
}, [navigate]);
  return (
    <div>
      <Navbar/>
    
   <div className="mt-16 mb-9">
  <section className="bg-white dark:bg-gray-900">
    <div className="grid max-w-screen-xl px-2 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
      
      <div className="lg:col-span-5 lg:flex lg:order-1 order-2">
        <img
          src="rtcf.jpg"
          alt="heroimage"
          className="rounded-xl h-auto w-full  object-cover lg:p-10 sm:p-20 p-10 "
        />
      </div>

      <div className="mr-auto place-self-center lg:col-span-7 lg:order-2 order-1">
        <h1 className="max-w-2xl mb-6 text-5xl  font-extrabold tracking-tight leading-none md:text-6xl dark:text-white">
          Book Your Next Bus Journey with Ease
        </h1>
        <p className="mb-6 font-light text-gray-500 text-xl dark:text-gray-400">
          Join thousands of travelers who trust us to get them to their destinations comfortably and on time. Whether you're traveling for work, leisure, or exploring new places, we provide reliable bus services with easy online booking and customer support every step of the way.
        </p>
        <Link
          to='/Book'
          className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
        >
          Get started
          <svg
            className="w-5 h-5 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
        <div
          
          className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          Speak to Sales
        </div>
      </div>

    </div>
  </section>
</div>
 <Footer/>
</div>
  )
}

export default Home
