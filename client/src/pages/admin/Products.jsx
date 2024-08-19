import React, { useEffect, useState, useTransition } from 'react'
import axios from 'axios'
import Button from '../../components/ui/Button'
function Products() {
    const [products, setProducts] = useState([])
    const [isPending, startTransition] = useTransition()
    useEffect(()=> {
        async function getProduct() {
            const response = await axios.get('product/all')
            console.log(products)
            startTransition(()=> {
                setProducts(response.data)
            })
        }
        getProduct();
    },[])
   
  return (
    <div>
{isPending ? <div>Pending...</div> : products.length === 0 ? <div>No products were created</div> : <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                    className='object-cover h-24 aspect-video'
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
                    <Button type='button' className="py-1 px-2 text-black bg-white" label="Edit"/>
                </td>
            </tr>
           })}
            
        </tbody>
    </table>
</div>}
</div>
  )
}

export default Products