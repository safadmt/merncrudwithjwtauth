import React, { useEffect } from "react";
import "./auth.css";
import UserLogin from "./UserLogin";
import { IoClose } from "react-icons/io5";
import Signup from "./Signup";
import { useGlobalContext } from "../../context&reducer/context";
function Auth() {
    const {state,dispatch} = useGlobalContext()
   const handleClose = ()=> {
    dispatch({type: "set_auth_sidebar",payload:false})
    dispatch({type: "set_login_register",payload:true})

   }
  return (
    <div className="authsidebar p-10">
        <div><IoClose size={25} className="float-right text-white" 
        onClick={handleClose}/></div>
      <div className="mt-8">
        <div className="text-center font-bold text-xl mb-2 text-white">{state.is_login_or_regiser ? "Login" : "Register"}</div>
        <div><p className="text-sm text-white">{state.is_login_or_regiser ? "Welcome back! Please log in to access your account and continue your journey with us!." : 
        "Create your account to get started. Join us now!" }</p></div>
        <div className="mt-8">

         {state.is_login_or_regiser ? <UserLogin /> : <Signup/>}
          
        </div>
      </div>
    </div>
  );
}

export default Auth;
