import React, { Fragment, useEffect, useState, useTransition } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useGlobalContext } from '../../context&reducer/context'
function Products() {
    const Navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [isPending, startTransition] = useTransition()
    const {state, dispatch} = useGlobalContext()
    useEffect(()=> {
        async function getProduct() {
            try{
            const response = await axios.get('product/admin/all')
            startTransition(()=> {
                setProducts(response.data)
            })   
            }catch(err) {
             if(err?.response?.status === 401 || err?.response?.status === 403) {
                dispatch({type: "set_user", payload: {}})
                Navigate('/auth/admin-login')
             }
            }
            
        }
        getProduct();
    },[])
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
             await axios.delete(`product/${id}`)
             const userInfo = products.filter((product)=> product.product_id != id)
             setProducts(userInfo)
             Swal.fire({
                 title: "Deleted!",
                 text: "Your file has been deleted.",
                 icon: "success"
               });
             }
         }catch(err) {
             if(err?.response?.status === 401 || err?.response?.status === 403) {
                 toast.warning("Please login")
                 Navigate('/')
             } else{
                 console.log(err);
                 
             }  
         }
   }
  return (
    <Fragment>
{isPending ? <div>Pending...</div> : products.length === 0 ? <div>No products were created</div> : <div className="relative box-border overflow-x-auto shadow-md sm:rounded-lg">
    <table className=" text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            
            <tr>
                <th scope='col' className=''>
                    Product Image
                </th>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Model
                </th>
                <th scope="col" className="px-6 py-3 w-24">
                    Price
                </th>
                <th scope="col" className="px-6 py-3 w-28">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
           {products?.map((item)=> {
                return <tr key={item.product_id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="col" className="px-6 py-4">
                    <img src={`http://localhost:5000/images/${item.image_id}`} 
                    className='object-cover h-24 aspect-video min-w-28'
                    alt="product_image"  />
                </th>
                <th scope="col" className="px-6 py-4">
                    {item?.name}
                </th>
                <td className="px-6 py-4">
                {item?.model}
                </td>
                <td className="px-6 py-4">
                {item?.price}
                </td>
                <td className="px-6 py-4">
                <div className='w-28 truncate'>
                    {item?.description}
                </div>
                </td>
                <td className="px-6 py-4">
                    <Link to={`/admin/product/edit/${item.product_id}`} className="py-1 px-2 text-white bg-blue-600">
                        Edit
                    </Link>
                    <button onClick={()=>handleDelete(item.product_id)} className='py-1 px-2 text-white bg-red-600'>Delete</button>
                </td>
            </tr>
           })}
            
        </tbody>
    </table>
</div>}
</Fragment>
  )
}

export default Products