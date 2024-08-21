import React from 'react'

function InputCmp(props) {
  const {value="",type ,handleChange,name="", placeholder=""} = props
  return <input type={type} name={name} 
  value={value}
  onChange={handleChange}
  className='border-b-2 outline-none bg-white text-gray-600 w-full font-medium px-4 py-2 mt-2'
  placeholder={placeholder}/>
}

export default InputCmp