import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function LoadingSkeleton() {
  return (
    <div className='mt-10 me-28'>
        <Skeleton className='mx-20' count={15}/>
    </div>
    
  )
}

export default LoadingSkeleton