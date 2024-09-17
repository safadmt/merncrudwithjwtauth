import React, {  useState,lazy} from 'react'
import { Outlet } from 'react-router-dom'
const Navbar = lazy(()=> import('../components/header/Navbar'));
import Auth from '../components/auth/Auth'
import { useGlobalContext} from '../context&reducer/context'
function RootUser() {
  const [navBarTitle] = useState("Sound Pulse")
  const [navbarItems] = useState(['Login', 'Signup'])
  const {state, dispatch} = useGlobalContext()

  

  return (
    <div>
      
        <Navbar title={navBarTitle} items={navbarItems}/>
        {state.isShowAuthSidebar && <Auth/>}
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default RootUser