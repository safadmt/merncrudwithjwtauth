import React from 'react'
import image from '../../../assets/images/frontpageimage.jpg'
import jblimage from '../../../assets/images/jblimage.jpg'
import './landingpage.css'
import Button from '../../../components/ui/Button'
import { useGlobalContext } from '../../../context&reducer/context'
import { useNavigate } from 'react-router-dom'
function LandingPage() {
    const {state, dispatch} = useGlobalContext()
    const Navigate = useNavigate()
    
  return (
    <div>
       <div className=' flex justify-center'>
            <div className='flex-1'>
                <img src={image} loading='lazy' className='h-[100vh] w-full object-cover' alt="" />
            </div>
            <div className='flex-1  relative '>
                <div>
                    <img src={jblimage} loading='lazy' alt="" className='h-[100vh] w-full object-cover'/>
                </div>
                <div className='absolute z-50 top-10 px-8'>
                <h1 className=' mb-2 text-white landing-page-heading'>Elevate Your Audio Experience with Sound Pulse</h1>
                <p className='shadow-md text-white landing-page-sentence' style={{textShadow: "2px"}}>Welcome to <strong>Sound Pulse</strong>, your ultimate destination for premium audio experiences.
                     Discover a world of crystal-clear sound with our handpicked collection of top-tier headphones, 
                     soundbars, and speakers, designed for audiophiles and casual listeners alike. 
                     Whether you're immersing yourself in your favorite music, enjoying an epic movie night,
                      or elevating your home sound system, our products offer the perfect balance of luxury,
                       performance, and style.

Explore the latest in cutting-edge sound technology, crafted to deliver rich bass,
 clear mids, and precise highs that bring your audio to life.</p>
                <Button label={"Shop now"} className={"bg-white text-[#252422]"} 
                onClick={()=> {
                    Object.keys(state?.user).length > 0 ? Navigate('/shop') : dispatch({type: "set_auth_sidebar", payload: true})
                }}/>
                </div>
                
            </div>
       </div>
    </div>
  )
}

export default LandingPage