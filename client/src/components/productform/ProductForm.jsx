import React from 'react'
import Button from '../ui/Button'

function ProductForm({handleChange, productInfo, handleSubmit,productError,handleFile,prevImg, currentImg}) {
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
            {prevImg && <div>
                <img src={`http://localhost:5000/images/${prevImg}`} alt="prevImg" 
                className='w-36 object-contain max-h-40' />
            </div>}
            {currentImg && <div>
              <img src={currentImg} alt="currentImg" className='w-28 object-cover max-h-48'/>
            </div> }
            <input 
            type='file' 
            name='image'
            onChange={handleFile}
            className='px-4 pt-2 mt-1 outline-none border-2 border-[#fdf0d5] text-gray-500 rounded w-full'/>
            <span className='text-sm font-bold text-yellow-400 block'>{productError?.image}</span>
            <Button type={"submit"} className={"bg-[#fdf0d5] w-full text-black font-medium"} label={"Submit"}/>
          </form>
        </div>
  )
}

export default ProductForm