import React, { memo } from 'react';
import { FaEdit } from 'react-icons/fa'; // Import edit icon
import { MdDelete } from 'react-icons/md'; // Import delete icon
import { useNavigate } from 'react-router-dom';

function ProductTable({productsInfo,deleteItem }) {
  const Navigate = useNavigate()
  
  return (
    <div>
      <div className="inline-block min-w-full py-2">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b bg-[#403d39] text-white font-medium dark:border-neutral-500">
              <tr>
                <th scope='col' className='px-2 py-4'>Sl num</th>
                <th scope='col' className='px-2 py-4'>created_at</th>
                <th scope='col' className='px-2 py-4'>Name</th>
                <th scope='col' className='px-2 py-4'>Price</th>
                <th scope='col' className='px-2 py-4'>Stock Available</th>
                <th scope='col' className='px-2 py-4'>brand</th>
                <th scope='col' className='px-2 py-4'>category</th>
                <th scope='col' className='px-2 py-4'>created by</th>
                <th scope="col" colSpan={2} className="px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {productsInfo?.map((product,index)=> (
                <tr key={product.product_id}>
                <td className='px-2 py-4 whitespace-wrap font-medium'>{index + 1}</td>
                <td className='px-2 py-4 whitespace-wrap font-medium'>{product.created_at}</td>
                <td className='px-2 py-4 max-w-[200px] whitespace-wrap font-medium'>{product.product_name}</td>
                <td className='px-2 py-4 whitespace-wrap font-medium'>Rs. {product.price}</td>
                <td className='px-2 py-4 whitespace-wrap font-medium'>{product.stock_available}</td>
                <td className='px-2 py-4 whitespace-wrap font-medium'>{product.brand.brand_name}</td>
                <td className='px-2 py-4 whitespace-wrap font-medium'>{product.category.category_name}</td>
                <td className='px-2 py-4 whitespace-wrap font-medium'>{product.admin.username}</td>
                <td className='px-2 py-4 whitespace-wrap font-medium'>{product.admin.description}</td>
                <td className="whitespace-nowrap flex gap-4 px-6 py-4 font-medium">
                  <div>

                 
                  <FaEdit
                    size={20}
                    className="text-[#003049] hover:cursor-pointer"
                    onClick={() => Navigate(`/admin/product/edit/${product.product_id}`)} // Call edit function
                  />
                   </div>
                   <div>
                  <MdDelete
                    size={20}
                    className="text-[#f94144] hover:cursor-pointer"
                    onClick={() => deleteItem(product.product_id)} // Call delete function
                  />
                  </div>
                </td>
                
              </tr>
              ))}
                
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductTable);
