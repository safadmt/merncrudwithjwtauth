import React, { Fragment, useState } from 'react'
import InputCmp from '../ui/InputCmp'
import Button from '../ui/Button'
import {  useGlobalContext } from '../../context&reducer/context'
import { toast } from 'react-toastify'
import { userSchema } from '../../validation'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function UserLogin() {
    const [loginInfo, setLoginInfo] = useState({email: "",password:""})
    const {state, dispatch} = useGlobalContext()
    const Navigate = useNavigate();

    async function handleSubmit (e) {
      e.preventDefault()
      const {email,password} = loginInfo
      try{
        await userSchema.validate({username:"safadf", email,password})
        const response = await axios.post('auth/login',loginInfo)
        if(response?.data?.user?.role === 'user') {
          var {username,user_id} = response.data.user
          dispatch({type:"set_auth_sidebar", payload:false})
          dispatch({type:"set_user",payload: {username, user_id}})
          toast.success("Login successfull")
        }else if(response?.data?.user?.role === "admin") {
          dispatch({type:"set_user",payload: {username, user_id}})
          Navigate('/admin')
          toast.success("Login successfull")
        }
      }catch(error) {
        console.log(error.response.data);
        
        if(error.name === 'ValidationError') {
          toast.warning(error.message)
        }else if(error?.response?.status === 400 ) {
          console.log(error.response.data?.validationError , "eror valid");
          
          error.response.data?.validationError?.forEach((item)=> {
            toast.warning(item.message)
          })
          
        }
      }
      

    }
    function handleChange(e) {
        const {name, value} = e.target;
        setLoginInfo({...loginInfo, [name] : value})
    }
  return (
    <Fragment>
        <form action="" onSubmit={handleSubmit}>
            <InputCmp 
            type={'email'}
            name={"email"}
            value={loginInfo.email}
            placeholder="Enter your email"
            handleChange={handleChange}/>
            <InputCmp
            type="password" 
            name={"password"}
            value={loginInfo.password}
            placeholder="Enter your password"
            handleChange={handleChange}/>
            <Button type={"submit"} className="bg-[#0336FF] w-full font-medium text-white" label={"Login"}/>
        </form>
        <p className='text-sm'>Don't have an account? please <span 
        className='text-blue-800 hover:cursor-pointer'
        onClick={()=> dispatch({type: "set_login_register", payload:false})}>Register</span></p>
    </Fragment>
  )
}

export default UserLogin