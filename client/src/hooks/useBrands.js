import { useState, useEffect, useTransition } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context&reducer/context';

const useBrands = (setBrand) => {
  const {state, dispatch} = useGlobalContext()
  const [isPending, startTransition] = useTransition()
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const response = await axios.get('api/brands');
      startTransition(() => {
        setBrands(response.data?.data); 
      });
      
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const createBrand = async (brand) => {
    event.preventDefault()
    if (!brand.trim()) {
      toast.warning("Brand name is required");
      return;
    }
    try {
      const response = await axios.post('api/brands/create', { brand_name: brand });
      setBrand("")
      startTransition(() => {
      setBrands((prevBrands) => [...prevBrands, response.data?.data]);
      })
      toast.success("Brand created successfully");
    } catch (err) {
      handleError(err);
    }
  };

  const handleError = (err) => {
    if (err?.response) {
      const { status, data } = err.response;
      if (status === 409 || status === 400) {
        toast.error(data?.error);
      } else if (status === 403 || status === 401) {
        Swal.fire("Your session has ended. Please log in again to continue.");
        dispatch({type: "set_user", payload: {}})
        navigate('/auth/admin-login');
      } else {
        console.error(err);
      }
    } else {
      console.error(err);
    }
    setError(err);
  };

  async function updateBrand (brand,brandid) {
    if (!brand.trim()) {
        toast.warning("Brand name is required");
        return;
      }
      try {
        const response = await axios.put(`api/brands/update/${brandid}`, { brand_name: brand });
        fetchBrands()
        toast.success("Brand created successfully");
      } catch (err) {
        handleError(err);
      }
  }

  
  async function deleteBrand (brandid) {
    
    if (!brandid) {
        toast.warning("Brand name is required");
        return;
      }
      try {
        const result = await Swal.fire({
            text: "Do you want to delete this brand",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes,Delete it!",
          })
          if(result.isConfirmed) {
        const response = await axios.delete(`api/brands/${brandid}`);
        let newbrands = brands.filter(brand=> brand.brand_id !== brandid)
        setBrands(newbrands);
        
          Swal.fire({
            title: "Deleted!",
            text: "Brand deleted.",
            icon: "success"
          });
        }
      } catch (err) {
        handleError(err);
      }
  }
  return {
    brands,
    loading,
    error,
    fetchBrands,
    createBrand,
    deleteBrand,
    updateBrand,
    handleError
  };
};

export default useBrands;
