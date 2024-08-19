import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/header/Navbar'
import Auth from '../../components/auth/Auth'
import { SidebarShow} from '../../context/userContext'
function RootUser() {
  const {isAuthSidebarShow, setIsAuthSidebarShow} = useContext(SidebarShow)
  const [navBarTitle] = useState("User management")
  const [navbarItems] = useState(['Login', 'Signup', 'Admin'])

  useEffect(()=> {
    console.log(isAuthSidebarShow);
    
  }, [isAuthSidebarShow])
  return (
    <div>
      
        <Navbar title={navBarTitle} items={navbarItems}/>
        {isAuthSidebarShow &&<Auth/>}
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default RootUser