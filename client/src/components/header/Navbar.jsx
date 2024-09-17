import React, { useState, useEffect, memo,  } from 'react';
import './navbar.css';
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context&reducer/context';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = ({ title, items }) => {
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [windowMenu, setWindowMenu] = useState(window.innerWidth >= 600);
    const [ulDisplay, setUlDisplay] = useState(window.innerWidth < 600 ? "none" : "flex");
    const {state,dispatch} = useGlobalContext()
    
    const Navigate = useNavigate()
    useEffect(() => {
        const handleWindowSize = () => {
            const currentWidth = window.innerWidth;
            setWindowSize(currentWidth);
            
            if (currentWidth < 600) {
                setUlDisplay("none");
                setWindowMenu(true);
            } else {
                setWindowMenu(false);
                setUlDisplay("flex");
            }
        };

        window.addEventListener("resize", handleWindowSize);

        return () => {
            window.removeEventListener("resize", handleWindowSize);
        };
    }, []);
    
    const handleMenuToggle = () => {
        if (windowMenu) {
            setUlDisplay("flex");
            setWindowMenu(false);
        } else {
            setUlDisplay("none");
            setWindowMenu(true);
        }
    };

    const handleLogout = async() => {
        
        try{
            
            const response = await axios.get('api/auth/logout')            
            if(response.status === 204 || response.status === 200) {
                dispatch({type: "set_user", payload: {}})
                toast.success("Logout successfull")
                Navigate('/')
            }
        }catch(err) {
            console.log(err);
            
        }
        
    }
    const handleClick = (item)=> {
        switch (item) {
            case 'Login': {
                dispatch({type: "set_auth_sidebar", payload: true})
            }
            break;
            case 'Signup': {
                dispatch({type: "set_auth_sidebar", payload: true})
                dispatch({type: "set_login_register", payload: false})
                
            }
            break;
            case 'Logout': {
                handleLogout()
            }
            default:
                break;
        }
    }
    return (
        <div id='navbar'>
            <div className='w-full font-medium bg-[#252422] flex justify-between items-center h-[80px] ps-8 pe-12 box-border text-white shadow-md shadow-[#5e503f]'>
                <div className='font-medium text-xl'><Link to={'/'}>{title}</Link></div>
                <div className='menuicon'>
                    {windowMenu ? (
                        <IoMenu size={25} onClick={handleMenuToggle} />
                    ) : (
                        <IoClose size={25} onClick={handleMenuToggle} />
                    )}
                </div>
                {state?.user?.username ? 
                <ul className='font-medium' style={{ display: ulDisplay }}>
                    <li><Link to={'/shop'}>shop</Link></li>
                    <li>{state?.user?.username}</li>
                    <li className='hover:cursor-pointer' onClick={handleLogout}>Logout</li>
                </ul> 
                : 
                <ul className='font-medium hover:cursor-pointer' style={{ display: ulDisplay }}>
                   {items?.map((item, index) => (
                       <li key={index} onClick={()=> handleClick(item)}>{item}</li>
                ))}
                </ul>}
            </div>
        </div>
    );
};

export default memo(Navbar);
