import React , {memo}from 'react'
import ImageGallery from 'react-image-gallery'
import Button from '../ui/Button'

function ImageForm({handleFileChange, handleImageSubmit,prevImage, loading = false}) {
  return (
    <>
        <form action="" onSubmit={handleImageSubmit}
        className="border-2 border-[#006d77] p-2 mt-6 rounded-md md:w-10/12 sm:w-full mx-auto min-w-[350px]">
          <div className="text-center font-bold text-xl">Edit Image</div>
          <ImageGallery items={prevImage}/>
          <div>
            <label htmlFor="">Select Images</label>
            <input type="file" multiple name="image" id="" onChange={handleFileChange}
            className="px-4 py-1 mt-1 outline-none border-2 border-[#006d77] text-gray-500 rounded-md w-full"/>
            <Button
          type={"submit"}
          className={"bg-[#252422] w-full text-white font-medium rounded-md"}
          disabled={loading ? true : false}
          label={loading ? <LineSpinner size={25} color={"#edf2f4"}/> : "Update Product Image"}
        />
          </div>
        </form>
    </>
  )
}
export default memo(ImageForm)