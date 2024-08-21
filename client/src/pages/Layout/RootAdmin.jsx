import React, { useEffect, useState } from 'react'
import Navbar from '../../components/header/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import { IoMdAdd } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import "../../components/sidebar/sidebar.css"
import { toast } from 'react-toastify';
import axios from 'axios';
function RootAdmin() {
    const Navigate = useNavigate()
    const [headingTitle] = useState("Admin Panel")
    const [items] = useState(["Logout"])
    const content = [
        {link: "/admin", value:"Add product", icon:<IoMdAdd/> },
        {link: "/admin/users", value: "Users", icon: <FaRegUser/>},
        {link: "/admin/products", value:"Products", icon: <FaShoppingBag/> }
    ]

    useEffect(()=> {
      async function isAuthorized() {
        try{
          const res = await axios.get('auth/admin')
        }catch(err) {
          console.log(err);
          
          if(err?.response?.status === 401 || err?.response?.status === 403) {
            toast.warning("Please login")
            Navigate('/auth/admin-login')
          }
          
        }
      }
      isAuthorized()
    },[])
  return (
    <div>
        <Navbar title={headingTitle} items={items}/>
        <div className='flex relative w-full'>
            <Sidebar content={content}/>
            <div className='content-area'>
                    <Outlet />
            </div>
            
        </div>
       
        
    </div>
  )
}

export default RootAdmin