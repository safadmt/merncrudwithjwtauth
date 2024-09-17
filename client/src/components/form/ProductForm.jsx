import React, { memo, useEffect } from "react";
import Button from "../ui/Button";
import useBrands from "../../hooks/useBrands";
import useCategories from "../../hooks/useCategories";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { LineSpinner } from "../spinners/Spinner";

function ProductForm(props) {
  const { fetchBrands, brands } = useBrands();
  const { fetchCategories, categories } = useCategories();
  let {
    productHeading,
    handleChange,
    productInfo,
    handleSubmit,
    productError,
    handleFile,
    currentImg,
    loading = false,
    showFileInput = true
  } = props;

  return (
    <div className="border-2 border-[#006d77] p-2 mt-6 rounded-md md:w-10/12 sm:w-full mx-auto min-w-[350px]">
      <h2 className="font-medium text-2xl text-center">{productHeading}</h2>

      <form action="" className="w-full" onSubmit={handleSubmit}>
        <div className="md:flex sm:block gap-6 flex-wrap">
          <div className="flex-1">
            <label htmlFor="" className="text-black">
              Product Name
            </label>
            <input
              type="text"
              name="product_name"
              value={productInfo.product_name}
              onChange={handleChange}
              className="px-4 py-1 mt-1 outline-none border-2 border-[#006d77] text-gray-600 rounded-md w-full"
            />
            <span className="text-sm font-bold text-yellow-400 block">
              {productError?.name}
            </span>

            <label htmlFor="" className="text-black">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={productInfo.price}
              onChange={handleChange}
              className="px-4 py-1 mt-1 outline-none border-2 border-[#006d77] text-gray-500 rounded-md w-full"
            />
            <span className="text-sm font-bold text-yellow-400 block">
              {productError?.price}
            </span>
            <label htmlFor="" className="text-black ">
              Stock Available
            </label>
            <input
              type="number"
              name="stock_available"
              value={productInfo.stock_available}
              onChange={handleChange}
              className="px-4 py-1 mt-1 outline-none border-2 border-[#006d77] text-gray-500 rounded-md w-full"
            />
            <span className="text-sm font-bold text-yellow-400 block">
              {productError?.stock_available}
            </span>
            <label htmlFor="options">Select Brand</label>
            <select
              id="options"
              onChange={handleChange}
              name="brand_id"
              className="px-4 py-1 mt-1 outline-none border-2 border-[#006d77] text-gray-500 rounded-md w-full"
            >
              <option value={productInfo.brand_id.brand_id || ""}>{productInfo.brand_id.brand_name || "Select"}</option>
              {brands?.map((item, index) => (
                <option key={index} value={item.brand_id}>
                  {item.brand_name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            
            <label htmlFor="options">Select Brand</label>
            <select
              id="options"
              onChange={handleChange}
              name="category_id"
              
              className="px-4 py-1 mt-1 outline-none border-2 border-[#006d77] text-gray-500 rounded-md w-full"
            >
              <option value={productInfo?.category_id.category_id || ""}>{productInfo?.category_id.category_name || "Select"}</option>
              {categories?.map((item, index) => (
                <option key={index} value={item.category_id}>
                  {item.category_name}
                </option>
              ))}
            </select>
            <label htmlFor="" className="text-black">
              Description
            </label>
            <textarea
              name="description"
              id=""
              value={productInfo.description}
              onChange={handleChange}
              className="w-full px-4 border-[#006d77] border-2 outline-none rounded-md"
              rows={4}
            ></textarea>
            <span className="text-sm font-bold text-yellow-400 block">
              {productError?.description}
            </span>
            {showFileInput && <div><label htmlFor="">Select Images</label>
            <input
              type="file"
              name="image"
              onChange={handleFile}
              multiple
              className="px-4 py-1 mt-1 outline-none border-2 border-[#006d77] text-gray-500 rounded-md w-full"
            />
            </div>}
          </div>
        </div>
        {showFileInput && <div>
              {currentImg?.length > 0 && <ImageGallery items={currentImg} />}
        </div>}
        <Button
          type={"submit"}
          disabled={loading ? true : false}
          className={"bg-[#252422] w-full text-white font-medium rounded-md"}
          label={loading ? <LineSpinner color={"#edf2f4"} size={25}/> : showFileInput === true ? "Submit" : "Update product details"}
        />
      </form>
    </div>
  );
}

export default memo(ProductForm);
