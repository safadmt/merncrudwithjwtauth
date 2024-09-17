import React, { useState,lazy ,Suspense} from 'react'
import './admin.css'
import LoadingSkeleton from '../../components/skeleton/LoadingSkeleton'
const CategorySection = lazy(()=> import('../../components/admin/CategorySection'))
const BrandSection = lazy(()=> import('../../components/admin/BrandSection'))

function AdminHome() {

  return (
    <div className='adminhome pt-4'>
        <div className='md:mx-8 sm:mx-2'>
          <Suspense fallback={<LoadingSkeleton/>}>
          <BrandSection/>
          </Suspense>
        </div>
        <div className='md:mx-8 sm:mx-2'>
        <Suspense fallback={<LoadingSkeleton/>}>
          <CategorySection />
          </Suspense>
        </div>
    </div>
  )
}

export default AdminHome