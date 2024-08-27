import React, { Fragment, useState } from 'react'
import Button from '../../components/ui/Button'
import axios from 'axios'
import { productSchema } from '../../validation'
import './admin.css'
import ProductForm from '../../components/productform/ProductForm'
import { toast } from 'react-toastify'

function AddProduct() {
  const [productInfo,setProductInfo] = useState({
    name: "",
    model: "",
    price: "",
    description: "",
    image: ""
  })
  const [productError, setErrors] = useState({})
  const [currentImagePreviw, setCurrentImagePreview] = useState("");
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

      toast.success("Product added successfully")
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
    }
    
    

  }
  const handleFileChange = (e)=> {
    setProductInfo({...productInfo, image: e.target.files[0]})
    const reader = new FileReader();

    reader.onloadend = () => {
      setCurrentImagePreview(reader.result);
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setCurrentImagePreview("");
    }
  }
  const handleChange = (e) => {
    const {name, value} = e.target;
    setProductInfo({...productInfo, [name]: value})
  }
  return (
    <div  className='w-8/12 px-6'>
      <ProductForm 
      handleChange={handleChange} 
      productInfo={productInfo} 
      handleSubmit={handleSubmit}
      productError={productError}
      handleFile={handleFileChange}
      currentImg={currentImagePreviw}/>
    </div>
  )
}

export default AddProduct