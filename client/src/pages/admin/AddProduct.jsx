import React, { Fragment, useEffect, useState } from 'react'
import Button from '../../components/ui/Button'
import axios from 'axios'
import { productSchema } from '../../validation'
import './admin.css'

function AddProduct() {
  
  const [productInfo,setProductInfo] = useState({
    name: "",
    model: "",
    price: "",
    description: "",
    image: ""
  })
  const [productError, setErrors] = useState({})
  
  async function handleSubmit (e) {
    e.preventDefault()
    try {
      
      await productSchema.validate(productInfo, { abortEarly: false });
      console.log('Form data is valid:', productInfo)
      // Proceed with form submission (e.g., API call)
      const formData = new FormData();
      formData.append('name', productInfo.name)
      formData.append('model', productInfo.model)
      formData.append('price', productInfo.price)
      formData.append('description', productInfo.description)
      formData.append('image', productInfo.image)

      const response = await axios.post('product/add', formData, 
        {headers: {'Content-Type':'multipart/form-data'}})

      console.log(response);
      setProductInfo({
        name: "",
        model: "",
        price: "",
        description: "",
        image: ""
      })
      
    } catch (validationErrors) {
      const formattedErrors = {};
      validationErrors.inner.forEach(error => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
      console.log('Validation errors:', formattedErrors);
    }
    
    

  }
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setProductInfo({...productInfo, [name]: value})
  }
  return (
    <div className='bg-[#0336FF] mx-auto p-8 mt-8'>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="" className='text-white'>Product Name</label>
            <input 
            type="text"
            name='name'
            value={productInfo.name}
            onChange={handleChange} 
            className='px-4 pt-2 mt-1 outline-none border-2 border-[#fdf0d5] text-gray-500 rounded w-full'/>
            <span className='text-sm font-bold text-yellow-400 block'>{productError?.name}</span>
            
            <label htmlFor="" className='text-white'>Price</label>
            <input 
            type="number"
            name='price' 
            value={productInfo.price}
            onChange={handleChange}
            className='px-4 pt-2 mt-1 outline-none border-2 border-[#fdf0d5] text-gray-500 rounded w-full'/>
            <span className='text-sm font-bold text-yellow-400 block'>{productError?.price}</span>
            <label htmlFor="" className='text-white '>Model</label>
            <input 
            type="text" 
            name='model'
            value={productInfo.model}
            onChange={handleChange}
            className='px-4 pt-2 mt-1 outline-none border-2 border-[#fdf0d5] text-gray-500 rounded w-full'/>
            <span className='text-sm font-bold text-yellow-400 block'>{productError?.model}</span>
            <label htmlFor="" className='text-white'>Description</label>
            <textarea name="description" id="" 
            value={productInfo.description}
            onChange={handleChange}
            className='w-full border-[#fdf0d5] outline-none' rows={4}></textarea>
            <span className='text-sm font-bold text-yellow-400 block'>{productError?.description}</span>
            <input 
            type='file' 
            name='image'
            onChange={(e)=> setProductInfo({...productInfo, image: e.target.files[0]})}
            className='px-4 pt-2 mt-1 outline-none border-2 border-[#fdf0d5] text-gray-500 rounded w-full'/>
            <span className='text-sm font-bold text-yellow-400 block'>{productError?.image}</span>
            <Button type={"submit"} className={"bg-[#fdf0d5] w-full text-black font-medium"} label={"Submit"}/>
          </form>
        </div>
  )
}

export default AddProduct