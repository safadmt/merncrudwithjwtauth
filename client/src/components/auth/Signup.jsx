import React, { useContext, useState } from 'react'
import InputCmp from '../ui/InputCmp';
import Button from '../ui/Button';
import {  useGlobalContext } from '../../context&reducer/context';
import { userSchema } from '../../validation';
import { toast } from 'react-toastify';
import axios from 'axios';

function Signup() {
    const [signupInfo, setsignupInfo] = useState({username:"",email: "",password:""})
    const {state, dispatch} = useGlobalContext()
    async function handleSubmit (e) {
      e.preventDefault();
      try{
        await userSchema.validate(signupInfo)
        const response = await axios.post('auth/signup', signupInfo)
        if(response.data?.user) {
          toast.success("Successfully signup. Please login ")
          dispatch({type: "set_login_register", payload: true })
        }else{
          console.log(response.data);
          
        }
      }catch (error) {
        
        if(error.name === 'ValidationError') {
          toast.warning(error.message)
        }else if(error?.response?.status === 400) {
          console.log(error.response.data?.validationError , "eror valid");
          
          error.response.data?.validationError?.forEach((item)=> {
            toast.warning(item.message)
          })
          
        }
        
      }
      
    } 

    function handleChange(e) {
        const {name, value}= e.target;
        setsignupInfo({...signupInfo, [name] : value})
    }
  return (
    <div>
         <form action="" onSubmit={handleSubmit}>
            <InputCmp 
            type={"text"}
            name={"username"}
            value={signupInfo.username}
            placeholder="Enter your username"
            handleChange={handleChange}/>
            <InputCmp
            type="email" 
            name={"email"}
            value={signupInfo.email}
            placeholder="Enter your email"
            handleChange={handleChange}/>
            <InputCmp 
            type="password"
            name={"password"}
            value={signupInfo.password}
            placeholder="Enter your password"
            handleChange={handleChange}/>
            <Button type={"submit"} className="bg-[#0336FF] w-full font-medium text-white" label={"Register"}/>
        </form>
        <p className='text-sm'>Already have account? please <span 
        className='text-blue-800 hover:cursor-pointer'
        onClick={()=> dispatch({type: "set_login_register",payload:true})}>Login</span></p>
    </div>
  )
}

export default Signup