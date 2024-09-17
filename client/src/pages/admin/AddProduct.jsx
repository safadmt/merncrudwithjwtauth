  import React, {  useState } from 'react'
  import axios from 'axios'
  import { productSchema } from '../../validation'
  import './admin.css'
  import ProductForm from '../../components/form/ProductForm'
  import { toast } from 'react-toastify'
import useErrorHandler from '../../hooks/useErrorHandler'


  function AddProduct() {
    const {handleServerError,handleValidationError} = useErrorHandler()
    const [images, setImages] = useState([])
    const [imagePreview, setImagePreview] = useState([])
    const [loading, setLoading] = useState(false)
    const [productInfo,setProductInfo] = useState({
      product_name: "",
      price: "",
      description: "",
      stock_available:"",
      brand_id: "",
      category_id:""
    })
    const [productError, setErrors] = useState({})

    async function handleSubmit (e) {
      e.preventDefault()
      try {
        
        if(Object.values(productInfo).includes("")) {
          return toast.warning('Required all field')
        }
        if(images.length === 0) {
          return
        }
        await productSchema.validate(productInfo, { abortEarly: true });
        console.log('Form data is valid:', productInfo)
        // Proceed with form submission (e.g., API call)
        
        const formData = new FormData();
        formData.append('product_name', productInfo.product_name)
        formData.append('price', productInfo.price)
        formData.append('stock_available', productInfo.stock_available)
        formData.append('brand_id', productInfo.brand_id)
        formData.append('category_id', productInfo.category_id)
        formData.append('description', productInfo.description)

        
        images.forEach(image=> {
          formData.append('image', image)
        })
        setLoading(true)
        const response = await axios.post('api/products/create', formData, 
          {headers: {'Content-Type':'multipart/form-data'}})
        setLoading(false)
        toast.success("Product added successfully")
        setProductInfo({
          product_name: "",
          stock_available: "",
          price: "",
          description: "",
          image: "",
          category_id:"",
          brand_id : "",
        })
        setImagePreview([])
        setImages([])
      } catch (err) {
        handleValidationError(err)
        handleServerError(err)
        
      }finally{
        setLoading(false)
      }
      
      

    }
    const handleFileChange = (e)=> {
      console.log(e.target.files);
      const files = Array.from(e.target.files);
      const imageUrls = files.map(file => ({
        original: URL.createObjectURL(file),
        thumbnail: URL.createObjectURL(file)
      }));
      
      setImagePreview(imageUrls);
      setImages(files)
      

    }
    const handleChange = (e) => {
      const {name, value} = e.target;
      setProductInfo({...productInfo, [name]: value})
    }
    return (
      <div  className='pe-4'>
        
        <ProductForm 
        handleChange={handleChange} 
        productInfo={productInfo} 
        handleSubmit={handleSubmit}
        productError={productError}
        handleFile={handleFileChange}
        currentImg={imagePreview}
        loading = {loading}
        productHeading={"Add Product"}/>
      </div>
    )
  }

  export default AddProduct