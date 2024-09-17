import React, { Fragment, useState, useTransition } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { LineSpinner } from "../../components/spinners/Spinner";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useGetUsers } from "../../hooks/useGetUser";
import EditUser from "../../components/form/EditUser";
import useErrorHandler from "../../hooks/useErrorHandler";
import { userSchema } from "../../validation";
import { useDeleteUser } from "../../hooks/useDeleteUser";

function User() {
    const [refresh, setRefresh] = useState(false);
    const {users,isPending:isUserPending,setUsers} = useGetUsers(refresh)
    const {handleDelete} = useDeleteUser(setUsers)
    const {handleValidationError, handleServerError} = useErrorHandler()
  const [isPending, startTransition] = useTransition();
  const [showEditForm, setShowEditForm] = useState(false)
  const [editUser,setEditUser] = useState({username:"",email:"", user_id:""})
    const [loading,setLoading] = useState(false)

  const handleSubmit = async (e)=> {
    e.preventDefault()
    try{
        const {username, email} = editUser
      await userSchema.validate({username, email,password: "454532f3"}, {abortEarly: true});
      setLoading(true)
      await axios.put(`api/users/${editUser.user_id}`, {username,email});
      setRefresh(prev => !prev);
      toast.success("Updated successfully");
    }catch(err) {
      console.log(err);
      
        handleValidationError(err)
        handleServerError(err)
    }finally{
        setLoading(false)
    }
    
  }
  const handleChange = (e)=> {
    const {name,value} = e.target
    setEditUser({...editUser, [name]:value})
  }
  return (
    <Fragment>
      {isPending ? (
        <div className="flex justify-center items-center">
          <LineSpinner size={45} color={"black"} />
        </div>
      ) : (
        <div className="md:mx-24  overflow-x-auto sm:rounded-lg">
          <table className=" text-sm  text-left rtl:text-right text-gray-500 mt-14 dark:text-gray-400 w-full">
            <thead className="text-xs text-white text-center uppercase bg-[#403d39]">
              <tr>
                <th scope="col" className="">
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
              {users?.map((item) => {
                return (
                  <tr
                    key={item.user_id}
                    className="border-b dark:border-gray-700"
                  >
                    <th scope="col" className="px-6 py-4">
                      {item?.username}
                    </th>
                    <td className="px-6 py-4">{item?.email}</td>
                    <td className="whitespace-nowrap flex gap-10 mt-4 font-medium">
                      <div className="">
                        <FaEdit
                          size={20}
                          className="text-[#003049] hover:cursor-pointer"
                          onClick={() => {
                            setEditUser({...editUser, username : item.username, email: item.email, user_id: item.user_id})
                            setShowEditForm(true)
                          }} // Call edit function
                        />
                      </div>
                      <div>
                        <MdDelete
                          size={20}
                          className="text-[#f94144] hover:cursor-pointer"
                          onClick={() => handleDelete(item.user_id,users)} // Call delete function
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {showEditForm && <EditUser  
          state={editUser} 
          handleChange={handleChange} 
          handleSubmit={handleSubmit}
          loading={loading}
          onCancel={()=> {setEditUser({...editUser, email:"", user_id:"",username:""}) 
          setShowEditForm(false)}}/>}
        </div>
        
      )}
    </Fragment>
  );
}

export default User;
