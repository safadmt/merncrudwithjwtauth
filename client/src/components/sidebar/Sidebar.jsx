import React from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'
function Sidebar({content}) {
  return (
    <div className='w-[200px]'>
    <div id='sidebar' className='bg-[#353535] text-white box-border py-4'>
        <div className='flex justify-center'>
            <ul className='w-full'>
                {content?.map((item)=> (
                    <li className='' key={item.value}>
                        <Link to={'/admin/products'} className='flex items-center pl-8 pr-8 justify-start hover:bg-[#ffffff] gap-3 hover:text-black py-2'><span>{item.icon}</span>{item.value}</Link>
                    </li>
                ))}
            </ul>
        </div>
    </div>
    </div>
  )
}

export default Sidebar