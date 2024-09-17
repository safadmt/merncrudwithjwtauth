import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useErrorHandler from '../../../hooks/useErrorHandler'
import useFetchProduct from '../../../hooks/useFetchProduct'
import ReactImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './viewproduct.css'
import { FaRupeeSign } from "react-icons/fa";
function ViewProduct() {
    const {productid} = useParams()
    const {handleServerError} = useErrorHandler()
    const [loading,setLoading] = useState(false)
    const {product,prevImage,images} = useFetchProduct(productid,handleServerError,setLoading, loading)
  return (
    <div className='w-full px-10 pb-20'>
      {product && <div className='border shadow-md p-8 shadow-black'>
        <div className='layout-view-product shadow-lg shadow-white'>
          <div className=''>
            <ReactImageGallery items={prevImage}/>
          </div>
          <div className=' text-start mt-4'>
              <h1 className='font-bold text-3xl text-[#f94144]'>{product?.product_name}</h1>
              <p className='flex items-center mt-4'><FaRupeeSign/><strong>{product?.price}/-</strong></p>
              <p>Brand : <strong>{product.brand_id.brand_name}</strong></p>
              <p>Category : <strong>{product.category_id.category_name}</strong></p>
              <p className='break-words mt-2'><strong>Description: </strong> {product.description}</p>
          </div>
        </div>
        <div className='pt-5'>
          
        </div>
      </div>}
      
    </div>
  )
}

export default ViewProduct