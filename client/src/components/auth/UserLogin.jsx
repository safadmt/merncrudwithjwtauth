import React, { Fragment, useState } from 'react'
import InputCmp from '../ui/InputCmp'
import Button from '../ui/Button'
import {  useGlobalContext } from '../../context&reducer/context'
import { toast } from 'react-toastify'
import { userSchema } from '../../validation'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { LineSpinner } from '../spinners/Spinner'
import useErrorHandler from '../../hooks/useErrorHandler'

function UserLogin() {
    const {authErrorHandler} = useErrorHandler()
    const [loginInfo, setLoginInfo] = useState({email: "",password:""})
    const {state, dispatch} = useGlobalContext()
    const [loading,setLoading] = useState(false)
    const Navigate = useNavigate();

    async function handleSubmit (e) {
      e.preventDefault()
      const {email,password} = loginInfo
      console.log(email,password);
      
      try{
        await userSchema.validate({username:"safadf", email,password},{abortEarly:true})
        setLoading(true)
        const response = await axios.post('api/auth/user/login',loginInfo)
        setLoading(false)
          var {username,user_id} = response.data.user
          dispatch({type:"set_auth_sidebar", payload:false})
          dispatch({type:"set_user",payload: {username, user_id}})
          toast.success("Login successfull")
        
      }catch(error) {
        authErrorHandler(error)
      }finally{
        setLoading(false)
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
            <Button type={"submit"} 
            className="bg-[#f94144] w-full font-medium text-white" 
            disabled={loading ? true : false}
            label={loading ? <LineSpinner size={25} color={"white"}/> : "Login"}/>
        </form>
        <p className='text-sm text-white'>Don't have an account? please <span 
        className='text-white hover:cursor-pointer'
        onClick={()=> dispatch({type: "set_login_register", payload:false})}>Register</span></p>
    </Fragment>
  )
}

export default UserLogin