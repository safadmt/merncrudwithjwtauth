import React, { useContext, useState } from 'react'
import InputCmp from '../ui/InputCmp'
import Button from '../ui/Button'
import { AuthContext } from '../../context/userContext'

function UserLogin() {
    const [loginInfo, setLoginInfo] = useState({email: "",password:""})
    const {loginorregister, setLoginorregister} = useContext(AuthContext)

    function handleChange(e) {
        const [name, value] = e.target;
        setLoginInfo({...loginInfo, [name] : value})
    }
  return (
    <div>
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
            <Button type={"button"} className="bg-[#0336FF] w-full font-medium" label={"Login"}/>
        </form>
        <p className='text-sm'>Don't have an account? please <span 
        className='text-blue-800 hover:cursor-pointer'
        onClick={()=> setLoginorregister(false)}>Register</span></p>
    </div>
  )
}

export default UserLogin