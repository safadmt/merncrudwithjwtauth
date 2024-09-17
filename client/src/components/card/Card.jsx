import React from 'react'
import { FaRupeeSign } from "react-icons/fa";
import { Link } from 'react-router-dom';
function Card(props) {
   const {item} = props
    console.log(item);
    
  return (
    <div className='border border-[#fef9ef] p-4 h-[300px] rounded-lg box-border shadow-xl'>
        <div>
            <Link to={`/product/${item.product_id}`} ><img className='h-[150px] mx-auto'
            src={`${item.images[0].image_url}`} alt="" loading='lazy'/>
            </Link>
        </div>
        <div className='mt-2'>
            <p className='truncate font-medium'>{item?.product_name}</p>
            <div className='flex items-center gap-1'>
            <FaRupeeSign size={14} />
            <p className='font-medium'>{item?.price}</p>

            </div>
            <p className='font-medium block'>{item.category?.category_name}</p>

            <p className='line-clamp-2 font-medium text-gray-700'>{item?.description}</p>
            
        </div>
    </div>
  )
}

export default Card