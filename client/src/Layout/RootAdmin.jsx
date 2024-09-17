import React, { useState } from 'react'
import Navbar from '../components/header/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'
import { IoMdAdd } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import "../components/sidebar/sidebar.css"
import { MdDashboard } from "react-icons/md";function RootAdmin() {
    const Navigate = useNavigate()
    const [headingTitle] = useState("Admin Panel")
    const [items] = useState(["Logout"])
    const content = [
        {link: "/admin", value:"Dashboared", icon: <MdDashboard/> },
        {link: "/admin/add-product", value:"Add product", icon:<IoMdAdd/> },
        {link: "/admin/users", value: "Users", icon: <FaRegUser/>},
        {link: "/admin/products", value:"Products", icon: <FaShoppingBag/> }
        
    ]

  return (
    <div className=''>
        <Navbar title={headingTitle} items={items}/>
        <div className='flex w-full'>
            <Sidebar content={content}/>
            <div className='content-area'>
                    <Outlet />
            </div>
            
        </div>
       
        
    </div>
  )
}

export default RootAdmin