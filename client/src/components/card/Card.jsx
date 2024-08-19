import React from 'react'
import { FaRupeeSign } from "react-icons/fa";
function Card(props) {
   const {item} = props
    
  return (
    <div className='border-2 border-[#fdf0d5] p-4 h-[300px] box-border'>
        <div>
            <img className='h-[150px] mx-auto'
            src={`http://localhost:5000/images/${item.image_id}`} alt=""/>
        </div>
        <div className='max-w-[280px]'>
            <p className='truncate'>{item.name}</p>
            <p className='truncate'>{item.model}</p>
            <p className='flex items-center'><FaRupeeSign size={14} />{item.price}</p>
            <p className='truncate'>{item.description}</p>
            
        </div>
    </div>
  )
}

export default Card