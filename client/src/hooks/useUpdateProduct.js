import axios from "axios";
import { toast } from "react-toastify";
import {productSchema} from '../validation'
const useProductSubmit = (productId, product,setLoading,loading, setPrevImage, handleValidationError, handleServerError) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { product_name, price, description, stock_available, brand_id, category_id } = product;

      let brand = typeof brand_id === "object" ? brand_id.brand_id : brand_id;
      let category = typeof category_id === "object" ? category_id.category_id : category_id;

      const info = {
        product_name,
        price,
        stock_available,
        description,
        brand_id: brand,
        category_id: category,
        created_by: productId,
      };

      await productSchema.validate(info, { abortEarly: false });
      setLoading({...loading, updating: true})
      await axios.put(`api/products/details/${productId}`, info);
      
      toast.success("Updated successfully");
      
    } catch (err) {
      handleValidationError(err);
      handleServerError(err);
    } finally {
        setLoading({...loading, updating: false})
    }
  };

  return handleSubmit;
};

export default useProductSubmit;
