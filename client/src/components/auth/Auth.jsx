import React, { useContext } from "react";
import "./auth.css";
import UserLogin from "./UserLogin";
import { IoClose } from "react-icons/io5";
import Signup from "./Signup";
import { AuthContext, SidebarShow } from "../../context/userContext";
function Auth() {
    const {loginorregister, setLoginorregister} = useContext(AuthContext)
    const {isAuthSidebarShow,setIsAuthSidebarShow} = useContext(SidebarShow)
   
  return (
    <div className="authsidebar p-10">
        <div><IoClose size={25} className="float-right" onClick={()=> setIsAuthSidebarShow(false)}/></div>
      <div className="mt-8">
        <div className="text-center font-bold text-xl mb-2 text-[#0336FF]">{loginorregister ? "Login" : "Register"}</div>
        <div><p className="text-sm">{loginorregister ? "Welcome back! Please log in to access your account and continue your journey with us!." : 
        "Create your account to get started. Join us now!" }</p></div>
        <div className="mt-8">

         {loginorregister ? <UserLogin /> : <Signup/>}
          
        </div>
      </div>
    </div>
  );
}

export default Auth;
