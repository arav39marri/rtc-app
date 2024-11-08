import React from 'react'
import { useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Createuser = () => {
    const [name , setFirstName] = useState("aravind");
  const [Secondname , setSecondName] = useState("bnhgfd");
  const [departure , setdeparture] = useState("fggffb");
  const [destination , setDestination] = useState("sfdgfn");
  const [phno , setphn] = useState(12345678);
  const [email , setEmail] = useState("abcd@gmail.com");
  const [password , setpassword] = useState("123456");
  const [passengers, setPass] = useState(2);
  const [date, setdate] = useState("df");
  const [time , setTime] = useState("dfgf");
  const navigate = useNavigate();

  const submit = async (e)=>{
    e.preventDefault();

    try{
      axios.post("http://localhost:2000/create",{
        name , phno, email ,password
      }).then(
        alert("user created successfully")
        
      )
      .then(
        navigate("/History")
      )
    }
    catch(error){
    
    }

}
  return (
    <div>
      <button onClick={submit}  className='bg-red-300' >
          clivkkfhg
      </button>
    </div>
  )
}

export default Createuser
