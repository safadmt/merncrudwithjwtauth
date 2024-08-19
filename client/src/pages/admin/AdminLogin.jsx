import React, { Fragment, useState } from 'react'
import InputCmp from '../../components/ui/InputCmp';
import Button from '../../components/ui/Button';

function AdminLogin() {
    
    const [loginInfo,setLoginInfo] = useState({email:"", password:""})

    function handleChange(e) {
        const [name, value] = e.target;
        setLoginInfo({...loginInfo, [name] : value})
    }
  return (
    <Fragment>
        <div className='bg-[#fdf0d5] p-6 md:w-8/12 sm:w-10/12 mx-auto mt-20'>
            <div className='font-bold text-center mb-8'>Admin Login</div>
            <form action="">
            <InputCmp 
            name={"email"}
            value={loginInfo.email}
            placeholder="Enter your email"
            handleChange={handleChange}/>
            <InputCmp 
            name={"password"}
            value={loginInfo.password}
            placeholder="Enter your password"
            handleChange={handleChange}/>
            <Button className="bg-[#0336FF] w-full font-medium" label={"Login"}/>
        </form>
        </div>
        
    </Fragment>
  )
}

export default AdminLogin