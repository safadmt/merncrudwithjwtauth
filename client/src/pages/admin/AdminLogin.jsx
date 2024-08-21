import React, { Fragment, useState } from 'react'
import InputCmp from '../../components/ui/InputCmp';
import Button from '../../components/ui/Button';
import UserLogin from '../../components/auth/UserLogin';
import { Link } from 'react-router-dom';

function AdminLogin() {
    
    
  return (
    <Fragment>
        <div className='bg-[#fdf0d5] p-6 md:w-6/12 sm:w-10/12 mx-auto mt-20'>
          <Link to={'/'} className='px-2 py-2 bg-blue-800 text-white mb-2'>Home</Link>
         <UserLogin/>
        </div>
    </Fragment>
  )
}

export default AdminLogin