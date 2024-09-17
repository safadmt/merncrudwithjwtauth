import React, { useState, useTransition } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import './admin.css'
import ProductTable from '../../components/tables/ProductTable'
import useErrorHandler from '../../hooks/useErrorHandler'
import useFetchProducts from '../../hooks/useFetchProducts'
function Products() {
    const [products, setProducts] = useState([])
    const [isPending, startTransition] = useTransition()
    const {handleServerError} = useErrorHandler()
    useFetchProducts(products, setProducts, handleServerError)

   const handleDelete = async (id)=> {
    try{
        const result = await Swal.fire({
             title: "Are you sure?",
             text: "You want to delete this product",
             icon: "warning",
             showCancelButton: true,
             confirmButtonColor: "#3085d6",
             cancelButtonColor: "#d33",
             confirmButtonText: "Yes, delete it!"
           })
 
             if (result.isConfirmed) {
             await axios.delete(`api/products/${id}`)
             const userInfo = products.filter((product)=> product.product_id != id)
             startTransition(()=> {
                    setProducts(userInfo)

             })
             Swal.fire({
                 title: "Deleted!",
                 text: "Your file has been deleted.",
                 icon: "success"
               });
             }
         }catch(err) {
            handleServerError(err)
         }
   }

   async function handleSearch (e) {
        const query = e.target.value
        
        if(!query) return
        try{
        const SearchResult = await axios.post('api/products/search', {search: query})
        
        setProducts(SearchResult.data.data)
        
        }catch(err) {
            handleServerError(err)
        }
    
   }
  return (
    <div className='mx-6'>
        <div className='py-2 mr-4 w-full'>
        <input type="search" name="search" placeholder='Search for products' 
        className='py-2 px-4 w-full outline-1 outline-[#006d77] border-2 border-[#006d77] rounded' 
        onChange={handleSearch}/>
    </div>
{isPending ? 
<div>Pending...</div> : 
products.length === 0 ? 
<div>No products were created</div> : 
<ProductTable productsInfo={products}
deleteItem={handleDelete}
/>}
</div>
  )
}

export default Products