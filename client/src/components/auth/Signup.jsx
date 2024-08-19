import React, { useContext, useState } from 'react'
import InputCmp from '../ui/InputCmp';
import Button from '../ui/Button';
import { AuthContext } from '../../context/userContext';

function Signup() {
    const [signupInfo, setsignupInfo] = useState({username:"",email: "",password:""})
    const {loginorregister, setLoginorregister} = useContext(AuthContext)
    function handleChange(e) {
        const [name, value] = e.target;
        setsignupInfo({...signupInfo, [name] : value})
    }
  return (
    <div>
         <form action="">
            <InputCmp 
            name={"username"}
            value={signupInfo.username}
            placeholder="Enter your email"
            handleChange={handleChange}/>
            <InputCmp 
            name={"email"}
            value={signupInfo.email}
            placeholder="Enter your email"
            handleChange={handleChange}/>
            <InputCmp 
            name={"password"}
            value={signupInfo.password}
            placeholder="Enter your password"
            handleChange={handleChange}/>
            <Button type={"button"} className="bg-[#0336FF] w-full font-medium " label={"Register"}/>
        </form>
        <p className='text-sm'>Already have account? please <span 
        className='text-blue-800 hover:cursor-pointer'
        onClick={()=> setLoginorregister(true)}>Login</span></p>
    </div>
  )
}

export default Signup