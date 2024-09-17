import { useState, useEffect, useTransition } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context&reducer/context';

const useCategories = (setCategory) => {
  const {state, dispatch} = useGlobalContext()
  const [isPending, startTransition] = useTransition()

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get('api/categories');
      startTransition(()=> {
              setCategories(response.data?.data);

      })
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (category) => {
    event.preventDefault()
    if (!category.trim()) {
      toast.warning("Category name is required");
      return;
    }
    try {
      const response = await axios.post('api/categories/create', { category_name: category });
      setCategory("")
      startTransition(()=> {
              setCategories((prevBrands) => [...prevBrands, response.data?.data]);

      })
      toast.success("Category created successfully");
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

  async function updateCategory (category,categoryid) {
    if (!category.trim()) {
        toast.warning("Category name is required");
        return;
      }
      try {
        const response = await axios.put(`api/categories/update/${categoryid}`, { category_name: category });
        fetchCategories()
        toast.success("Updated successfully");
      } catch (err) {
        handleError(err);
      }
  }

  
  async function deleteCategory (categoryid) {
    
    if (!categoryid) {
        toast.warning("Category name is required");
        return;
      }
      try {
        const result = await Swal.fire({
            text: "Do you want to delete this category",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes,Delete it!",
          })
          if(result.isConfirmed) {
        const response = await axios.delete(`api/categories/${categoryid}`);
        let newcategories = categories.filter(category=> category.category_id !== categoryid)
        console.log(newcategories);
        startTransition(()=> {
          setCategories(newcategories);
        })
        
        
          Swal.fire({
            title: "Deleted!",
            text: "Category deleted.",
            icon: "success"
          });
        }
      } catch (err) {
        handleError(err);
      }
  }
  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    deleteCategory,
    updateCategory,
    handleError
  };
};

export default useCategories;
