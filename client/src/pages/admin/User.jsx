import React, { Fragment, useEffect, useState, useTransition } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../../context&reducer/context'
import { toast } from 'react-toastify'

function User() {
    const Navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [isPending, startTransition] = useTransition()
    const {state, dispatch} = useGlobalContext()
    useEffect(()=> {
        async function getProduct() {
            try{
            const response = await axios.get('user/all')
            startTransition(()=> {
                setUsers(response.data)
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

    const handleDelete = async(id)=> {
        try{
       const result = await Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this user",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          })

            if (result.isConfirmed) {
            const res = await axios.delete(`user/${id}`)
            const userInfo = users.filter((user)=> user.user_id != id)
            setUsers(userInfo)
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
        {isPending ? <div>Pending...</div> : users.length === 0 ? <div>No users were created</div> : <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className=" text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 w-full">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            
            <tr>
                <th scope='col' className=''>
                    Username
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
           {users?.map((item)=> {
                return <tr key={item.user_id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
               
                <th scope="col" className="px-6 py-4">
                    {item?.username}
                </th>
                <td className="px-6 py-4">
                {item?.email}
                </td>
                <td className="px-6 py-4" colSpan={2}>
                    <Link to={`/admin/user/edit/${item.user_id}`}
                    className="py-1 px-2 text-white bg-blue-600 mr-2 hover:cursor-pointer">Edit</Link>
                    <button type="button" 
                    onClick={()=> handleDelete(item.user_id)}
                    className="py-1 px-2 text-white bg-red-600 hover:cursor-pointer">Delete</button>

                </td>
            </tr>
           })}
            
        </tbody>
    </table>
</div>}
    </Fragment>
  )
}

export default User