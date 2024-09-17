import React, { Fragment, useState } from 'react'
import InputCmp from '../../components/ui/InputCmp';
import Button from '../../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userSchema } from '../../validation';
import axios from 'axios';
import { LineSpinner } from '../../components/spinners/Spinner';

function AdminLogin() {
    const Navigate = useNavigate()
    const [loginInfo, setLoginInfo] = useState({email:"", password:""})
    const [loading, setLoading] = useState(false)
    function handleChange (e) {
      const {name, value} = e.target
      setLoginInfo({...loginInfo, [name] : value})
    }
    async function handleSubmit (e) {
      e.preventDefault()
      const {username,email,password} = loginInfo
      try{
        await userSchema.validate({username:"rrrrf", email,password})
        setLoading(true)
        const response = await axios.post('api/auth/admin/login',loginInfo)
        if(response?.data.admin){
          Navigate('/admin')
          toast.success("Login successfull")
        }
      }catch(error) {
        console.log(error);
        
        if(error.name === 'ValidationError') {
          toast.warning(error.message)
        }else if(error?.response) {
          const {status,data} = error.response
          if(status === 400 || status === 409 || status === 401) {
            Array.isArray(data?.error) ? toast.error(data.error.join(',')) : toast.error(data?.error)
          }else if(status === 500) {
            toast.error(data)
            
          }
          
        }else{
          console.log(error);
        }
        
      }finally{
        setLoading(false)
      }
    }
  return (
    <Fragment>
        <div className='bg-[#403d39] p-6 md:w-6/12 sm:w-10/12 mx-auto mt-20'>
          <Link to={'/'} className='px-2 py-2 bg-[#f94144] text-white mb-2'>Home</Link>
         <div>
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
            <Button type={"submit"} className="bg-[#f94144] w-full font-medium text-white" 
            disabled={loading ? true : false}
            label={loading ? <LineSpinner size={23} color={"white"}/> : "Login"}/>
        </form>
         </div>
        </div>
    </Fragment>
  )
}

export default AdminLogin