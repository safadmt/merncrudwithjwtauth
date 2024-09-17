import React, { memo } from 'react'
import Button from '../ui/Button'
import './form.css'

function EntityForm(props) {
    let {handleChange, state, handleSubmit,onCancel, label,btnlabel, mainHeading } = props
  return (
    <div className='entityform border-1 border-[#403d39] bg-[#ffffff] shadow-md shadow-[#403d39] p-4 mt-8 rounded-md '>
          <h4 className='text-[#252422] text-center'>{mainHeading}</h4>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="" className='text-252422'>{label}</label>
            <input 
            type="text"
            name='name'
            value={state}
            onChange={handleChange} 
            className='px-4 py-1 mt-1 outline-none border-2 border-[#403d39] text-gray-500 rounded-md w-full'/>
            <Button type={"submit"} className={"bg-[#252422] w-full text-white font-medium rounded-md"} 
            label={btnlabel}/>
            <Button type={"button"}     
            onClick={onCancel} 
            className={"bg-[#f94144] w-full text-white font-medium rounded-md"} 
            label={"Cancel"}/>
          </form>
        </div>
  )
}

export default memo(EntityForm) 