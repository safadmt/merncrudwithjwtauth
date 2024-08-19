import React, { useState, useEffect, useContext } from 'react';
import './navbar.css';
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { AuthContext, SidebarShow } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ title, items }) => {
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [windowMenu, setWindowMenu] = useState(window.innerWidth >= 600);
    const [ulDisplay, setUlDisplay] = useState(window.innerWidth < 600 ? "none" : "flex");
    const {isAuthSidebarShow,setIsAuthSidebarShow} = useContext(SidebarShow)
    const {loginorregister, setLoginorregister} = useContext(AuthContext)

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
    useEffect(()=> {console.log(isAuthSidebarShow);
    }, [isAuthSidebarShow])
    const handleMenuToggle = () => {
        if (windowMenu) {
            setUlDisplay("flex");
            setWindowMenu(false);
        } else {
            setUlDisplay("none");
            setWindowMenu(true);
        }
    };

    const handleClick = (item)=> {
        console.log(item);
    
        switch (item) {
            case 'Login': {
                setIsAuthSidebarShow(true)
            }
            break;
            case 'Signup': {
                setIsAuthSidebarShow(true)
                setLoginorregister(false)
            }
            break;
            case 'Admin': {
                Navigate('/auth/admin-login')
            }
            default:
                break;
        }
    }
    return (
        <div id='navbar'>
            <div className='w-full font-medium bg-[#0336FF] flex justify-between items-center h-[80px] ps-8 pe-12 box-border text-white shadow-sm shadow-[#0336FF]'>
                <div>{title}</div>
                <div className='menuicon'>
                    {windowMenu ? (
                        <IoMenu size={25} onClick={handleMenuToggle} />
                    ) : (
                        <IoClose size={25} onClick={handleMenuToggle} />
                    )}
                </div>
                <ul className='font-medium hover:cursor-pointer' style={{ display: ulDisplay }}>
                    {items?.map((item, index) => (
                        <li key={index} onClick={()=> handleClick(item)}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
