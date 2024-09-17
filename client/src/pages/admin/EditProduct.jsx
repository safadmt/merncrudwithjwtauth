import React, { Fragment, useState,lazy ,Suspense} from "react";
import {  useParams } from "react-router-dom";
import axios from "axios";
const ProductForm = lazy(()=> import("../../components/form/ProductForm"));
import { toast } from "react-toastify";
import useErrorHandler from "../../hooks/useErrorHandler";
import useFetchProduct from "../../hooks/useFetchProduct";
import useProductSubmit from "../../hooks/useUpdateProduct";
import ImageForm from "../../components/form/ImageForm";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";

function EditProduct() {
  const [images, setImages] = useState([])
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState({fetch: false, updating: false})
  const [isImageLoading,setImageLoading] = useState(false)
  const {handleValidationError,handleServerError} = useErrorHandler()
  const { productId } = useParams();
  const {prevImage,setPrevImage, setProduct, product} = useFetchProduct(productId,handleServerError,setLoading,loading)
  const handleSubmit = useProductSubmit(productId,product,setLoading,loading,setPrevImage,handleValidationError,handleServerError)        

  function handleChange(e) {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  }

  async function handleImageSubmit () {
    event.preventDefault()
    if(images.length === 0) {
      return
    }
    const formData = new FormData()
    images.forEach(item=> {
      formData.append('image', item)
    })

    try{
      setLoading({...loading, images: true})
      const response = await axios.put(`api/products/images/${productId}`, formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      toast.success("Updated successfully")
    }catch(err) {
      
      handleServerError(err)
    }finally {
      setLoading({...loading, images: false})
    }
  }

  function handleFileChange(e) {
    const files = Array.from(e.target.files);
      const imageUrls = files.map(file => ({
        original: URL.createObjectURL(file),
        thumbnail: URL.createObjectURL(file)
      }));
      
      setPrevImage(imageUrls);
      setImages(files)
      
  }
  return (
    <Fragment>
      {product ? (
        <div className="mx-4 ">
        <Suspense fallback={<LoadingSkeleton/>}>
        <ProductForm
          productInfo={product}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleFile={handleFileChange}
          productHeading={"Edit product details"}
          currentImg={prevImage}
          productError={errors}
          loading = {loading.updating}
          showFileInput={false}
        />
        </Suspense>
         <ImageForm handleFileChange={handleFileChange}
         handleImageSubmit={handleImageSubmit}
         prevImage={prevImage}
         loading={isImageLoading}
         />
        </div>
      ) : (
        <div>Pending...</div>
      )}
    </Fragment>
  );
}

export default EditProduct;
