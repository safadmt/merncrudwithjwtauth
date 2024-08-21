import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../context&reducer/context";
import axios from "axios";
import ProductForm from "../../components/productform/ProductForm";
import { toast } from "react-toastify";
import { productSchema } from "../../validation";

function EditProduct() {
  const { productId } = useParams();
  const { state, dispatch } = useGlobalContext();
  const Navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    model: "",
    price: "",
    description: "",
    image: "",
  });
  const [prevImage, setPrevImage] = useState("");
  const [currentImagePreviw, setCurrentImagePreview] = useState("");
  const [errors, setErrors] = useState({})
  useEffect(() => {
    async function getProduct() {
      try {
        const res = await axios.get(`product/${productId}`);

        const { name, model, price, description, image } = res.data;
        setProduct({ ...product, name, model, price, description });
        setPrevImage(res.data.image_id);
      } catch (err) {
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          dispatch({ type: "set_user", payload: {} });
          Navigate("/");
        }
      }
    }
    getProduct();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("hello submit")
    try {
      const {name,price,model,description,} = product
      await productSchema.validate({name,price,model,description, image:"dummy"}, {abortEarly: false});
        console.log(product);
        
      // Proceed with form submission (e.g., API call)
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("model", product.model);
      formData.append("price", product.price);
      formData.append("description", product.description);
      if (product.image !== "dummy") {
        formData.append("image", product.image);
      }

      const response = await axios.patch(`product/${productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Updated successfully");
      setCurrentImagePreview("")
    } catch (err) {
        console.log(err);
        
      if (err.name === "validationErrors") {
          const formattedErrors = {};

          validationErrors.inner.forEach((error) => {
            formattedErrors[error.path] = error.message;
          });
          setErrors(formattedErrors)
          console.log(errors);
          
        
      }else if(err?.response?.status === 401 || err?.response?.status === 403) {
        dispatch({type:"set_user", payload: {}})
      }
    }
  }

  function handleFileChange(e) {
    setProduct({...product, image: e.target.files[0]})
    const reader = new FileReader();

    reader.onloadend = () => {
      setCurrentImagePreview(reader.result);
    };
    if (e.target.files[0]) {
      setPrevImage("");
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setPrevImage(product.image_id);
      setCurrentImagePreview("");
    }
  }
  return (
    <Fragment>
      {product ? (
        <ProductForm
          productInfo={product}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleFile={handleFileChange}
          prevImg={prevImage}
          currentImg={currentImagePreviw}
          productError={errors}
        />
      ) : (
        <div>Pending...</div>
      )}
    </Fragment>
  );
}

export default EditProduct;
