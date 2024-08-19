import React, { useState } from 'react'
import Navbar from '../../components/header/Navbar'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import { IoMdAdd } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import "../../components/sidebar/sidebar.css"
function RootAdmin() {
    const [headingTitle] = useState("Admin Panel")
    const [items] = useState(["Logout"])
    const content = [
        {link: "/add-product", value:"Add product", icon:<IoMdAdd/> },
        {link: "/users", value: "Users", icon: <FaRegUser/>},
        {link: "/products", value:"Products", icon: <FaShoppingBag/> }
    ]
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