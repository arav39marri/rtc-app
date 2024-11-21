import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Test from './Test'

const Signup = () => {
    const backendUrl = 'https://rtc-app-bayg.onrender.com';
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setpassword] = useState(null);
    const [show, setshow] = useState(true) ;
    const navigate = useNavigate();
    const [message , setMessage] = useState("");
    const [regmessage, setregMessage] = useState("");
    const [regLoad, setregLod] = useState(false);
    const [LogLoad, setLogLod] = useState(false);
    useEffect(() => {
        // localStorage.clear();
        // console.log('Backend URL:', backendUrl);


        const user = localStorage.getItem('user');  
        // console.log();
        try {
          const parsedUser = user ? JSON.parse(user) : null;
          if (parsedUser) {
            navigate('/Home');
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('user'); 
        }
      }, [navigate]);
    const sign = async (e) => {
        e.preventDefault();
        setLogLod(true); // Set loading state for sign-in
        try {
            const response = await axios.post(`${backendUrl}/search`, { email, password });
            // console.log(response);
            if (response.status === 200) {
                setMessage(response.data); 
                localStorage.setItem('user', JSON.stringify(email));
                console.log("Sign-in successful");
                navigate('/Home'); 
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setMessage("User not found");
            } else if (error.response && error.response.status === 401) {
                setMessage("Incorrect username or password");
            } else {
                setMessage("An error occurred. Please try again.");
            }
            console.error("Sign-in error:", error);
        } finally {
            setLogLod(false); 
        }
    };
    
    const submit = async (e) => {
        setregLod(true); 
        e.preventDefault();
        try {
          const response = await axios.post(`${backendUrl}/create`, {
            name,
            email,
            password,
          });
          setregMessage(response.data);
          localStorage.setItem("user", JSON.stringify(email));
        //   console.log(localStorage);
          navigate("/Home"); // Redirect after successful registration
          console.log("User created successfully");
        } catch (error) {
            setregMessage("Error during registration");
          console.error("Error during registration:", error);
        } finally {
          setregLod(false); // Stop the loading state regardless of success/failure
        }
    };
      

  return (
    <div>
        <section class="bg-gray-50 dark:bg-gray-900">
            <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
                <div class="flex flex-col justify-center">
                    <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Start Your Journey Today!</h1>
                    <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Join millions of travelers who trust us for smooth and hassle-free bus journeys. With our user-friendly platform, you can book tickets, manage your trips, and explore exciting destinations—all in one place.</p>
                
                </div>
                <div >
                    <div class="w-full lg:max-w-xl p-6 space-y-8 sm:p-8  rounded-lg shadow-xl dark:bg-gray-800 bg-slate-200 ">
                       {show===  true && 
                        <div>
                            <h2 class="text-2xl font-bold text-gray-900 dark:text-blue-600">
                            Sign in 
                        </h2>
                        <form class="mt-8 space-y-6" onSubmit={sign}>
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input onChange={(e) =>{ setEmail(e.target.value) }} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                <input onChange={(e) =>{ setpassword(e.target.value)   }} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div class="flex items-start">
                                <p>{message}</p>
                                <div  class="ms-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Lost Password?</div>
                            </div>
                           
                            {/* <button type="submit" class="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">sign to your account</button> */}
                            <button 
                                type="submit" 
                                className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                disabled={LogLoad} // Disable button when loading
                            >
                                {LogLoad ? (
                                    <div role="status">
                                        <svg
                                            aria-hidden="true"
                                            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                            viewBox="0 0 100 101"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill"
                                            />
                                        </svg>
                                        <span className="sr-only bg-red-300">Loading...</span>
                                    </div>
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                            <div class="text-sm font-medium text-gray-900 dark:text-white">
                                Not registered yet? <div onClick={show =>setshow(false)} class="text-blue-600 hover:underline dark:text-blue-500 cursor-pointer ">Create account</div>
                            </div>  
                        </form>
                        </div>
                       }
                       {
                        !show  && 
                        <div>
                            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                            Register 
                        </h2>
                        <form class="mt-8 space-y-6" onSubmit={submit}>
                           <div>
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                <input onChange={(e) =>{ setName(e.target.value) ;} } type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input onChange={(e) =>{ setEmail(e.target.value)  }} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                <input onChange={(e) =>{ setpassword(e.target.value) ; }} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <p>{regmessage}</p>
                            <button 
                                type="submit" 
                                className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                disabled={regLoad} // Disable button when loading
                            >
                                {regLoad ? (
                                    <div role="status">
                                        <svg
                                            aria-hidden="true"
                                            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                            viewBox="0 0 100 101"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill"
                                            />
                                        </svg>
                                        <span className="sr-only bg-red-300">Loading...</span>
                                    </div>
                                ) : (
                                    "Register"
                                )}
                            </button>

                            <div class="text-sm font-medium text-gray-900 dark:text-white">
                                Already Have Account? <div class="text-blue-600 hover:underline dark:text-blue-500 cursor-pointer " onClick={show => setshow(true)}  >Login </div>
                            </div>  
                        </form>
                        </div>
                       }
                    </div>
                </div>
            </div>
        </section>
       

    </div>
  )
}

export default Signup;
