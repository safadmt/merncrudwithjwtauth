import React from 'react'

function InputCmp(props) {
  const {value="", handleChange,name="", placeholder=""} = props
  return <input type="text" name={name} id="" 
  value={value}
  onChange={(e)=> handleChange}
  className='border-b-2 outline-none bg-white text-gray-600 w-full font-medium px-4 py-2 mb-2'
  placeholder={placeholder}/>
}

export default InputCmp