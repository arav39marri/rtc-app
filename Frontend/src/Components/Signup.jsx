import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const backendUrl = process.env.REACT_APP_API_URL;
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setpassword] = useState(null);
    const [show, setshow] = useState(true) ;
    const navigate = useNavigate();
    const [message , setMessage] = useState("");
    useEffect(() => {
        // localStorage.clear();
        console.log('Backend URL:', backendUrl);


        const user = localStorage.getItem('user');  
        console.log();
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
    
        try {
            // console.log(`${backendUrl}`+'/search')
            const response = await axios.post(`${backendUrl}/search`, { email, password });
             console.log(response) ;
            if (response.status === 200) {
                setMessage(response.data); 
                localStorage.setItem('user',JSON.stringify(email)) ;
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
        }
    };
    
    
    const submit = async (e)=>{
        e.preventDefault();
    
        try{
            
            // console.log("user created ")
          axios.post("http://localhost:2000/create",{
            name ,  email ,password
          }).then(()=>{
            localStorage.setItem('user', JSON.stringify(email));
            console.log(localStorage);
            navigate('/Home');
            alert('user created succesfully ') ;
          }
          )
          .then(
           
            navigate("/Home")
          )
        }
        catch(error){
        
        }
    
    }

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
                            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                            Sign in to TSRTC
                        </h2>
                        <form class="mt-8 space-y-6" onSubmit={sign}>
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input onChange={(e) =>{ setEmail(e.target.value) ;console.log(email)}} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                <input onChange={(e) =>{ setpassword(e.target.value) ;console.log(password)  }} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div class="flex items-start">
                                <p>{message}</p>
                                <div  class="ms-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Lost Password?</div>
                            </div>
                            <button type="submit" class="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">sign to your account</button>
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
                            Register in to TSRTC
                        </h2>
                        <form class="mt-8 space-y-6" onSubmit={submit}>
                           <div>
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                <input onChange={(e) =>{ setName(e.target.value);console.log(name) ;} } type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input onChange={(e) =>{ setEmail(e.target.value) ; console.log(email) }} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                <input onChange={(e) =>{ setpassword(e.target.value) ; console.log(password ); }} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            
                            <button type="submit" class="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register </button>
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
