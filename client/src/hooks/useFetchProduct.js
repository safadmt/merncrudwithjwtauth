import { useEffect, useState } from "react";
import axios from "axios";

const useFetchProduct = (productId, handleServerError,setLoading,loading) => {
  const [product, setProduct] = useState(null);
  const [prevImage, setPrevImage] = useState([]);
  const [images ,setImages] = useState([])
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading({...loading, fetch: true})
        const res = await axios.get(`api/products/${productId}`);
        const { product_name, stock_available, brand, category, price, description, images } = res.data.data;
        
        setProduct({
          product_name,
          stock_available,
          price,
          description,
          brand_id: brand,
          category_id: category,
        });
        setLoading({...loading, fetch: false})
        setImages(images)
        const previewImg = images?.map((item) => ({
          original: item.image_url,
          thumbnail: item.image_url,
        }));
        setPrevImage(previewImg);
      } catch (err) {
        handleServerError(err);
      }
    }

    fetchProduct();
  }, []);

  return { product, setProduct, prevImage,images, setPrevImage};
};

export default useFetchProduct;
