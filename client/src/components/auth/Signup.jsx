import React, { useContext, useState } from 'react'
import InputCmp from '../ui/InputCmp';
import Button from '../ui/Button';
import {  useGlobalContext } from '../../context&reducer/context';
import { userSchema } from '../../validation';
import { toast } from 'react-toastify';
import axios from 'axios';
import useErrorHandler from '../../hooks/useErrorHandler';
import { LineSpinner } from '../spinners/Spinner';

function Signup() {
    const {authErrorHandler} = useErrorHandler()
    const {handleServerError} = useErrorHandler()
    const [signupInfo, setsignupInfo] = useState({username:"",email: "",password:""})
    const {state, dispatch} = useGlobalContext()
    const [loading,setLoading] = useState(false)
    async function handleSubmit (e) {
      e.preventDefault();
      try{
        await userSchema.validate(signupInfo)
        setLoading(true)
        const response = await axios.post('api/auth/user/signup', signupInfo)
        const {username, user_id} = response.data?.user
        dispatch({type:"set_auth_sidebar", payload:false})
        dispatch({type:"set_user",payload: {username, user_id}})
        toast.success("Successfully created accout")
      }catch (error) {
        authErrorHandler(error)
      }finally{
        setLoading(false)
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
            <Button type={"submit"} 
            disabled={loading ? true : false}
            className="bg-[#f94144] w-full font-medium text-white" 
            label={loading ? <LineSpinner size={25} color={"white"}/> :"Register"}/>
        </form>
        <p className='text-sm text-white'>Already have account? please <span 
        className='text-[#f2e9e4] hover:cursor-pointer'
        onClick={()=> dispatch({type: "set_login_register",payload:true})}>Login</span></p>
    </div>
  )
}

export default Signup