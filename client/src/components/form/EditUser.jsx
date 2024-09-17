import React, { memo } from 'react'
import Button from '../ui/Button'
import './form.css'
import '../../pages/admin/admin.css'
import { LineSpinner } from '../spinners/Spinner'
function EditUser({
    handleChange, 
        state, 
        handleSubmit,
        onCancel,
        loading
    }) {
    
  return (
    <div className='overlay'>
        <div className='edituserform bg-white p-6 mt-20 rounded-md shadow-md shadow-white'>
        <div className='font-bold text-xl'>Edit user</div>
        <form action="" onSubmit={handleSubmit}>
        <label htmlFor="" className='font-medium'>Username</label>
            <input 
            type="text"
            name='username'
            value={state?.username}
            onChange={handleChange} 
            className='px-4 py-1 mt-1 outline-none border-2 border-[#403d39] text-gray-500 rounded-md w-full'/>
            <label htmlFor="" className='font-medium'>email</label>
            <input 
            type="text"
            name='email'
            value={state.email}
            onChange={handleChange} 
            className='px-4 py-1 mt-1 outline-none border-2 border-[#403d39] text-gray-500 rounded-md w-full'/>
            <Button type={"submit"} className={"bg-[#252422] w-full text-white font-medium rounded-md"} 
            label={loading ? <LineSpinner size={25} color={"white"}/> :"Update user"}/>
            <Button type={"button"}     
            onClick={onCancel} 
            className={"bg-[#f94144] w-full text-white font-medium rounded-md"} 
            label={"Cancel"}/>
          </form>
          </div>
    </div>
  )
}

export default memo(EditUser)