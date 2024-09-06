import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../context&reducer/context";
import axios from "axios";
import { toast } from "react-toastify";
import { userSchema } from "../../validation";
import InputCmp from "../../components/ui/InputCmp";
import Button from "../../components/ui/Button";

function EditUser() {
  const { userId } = useParams();
  const { state, dispatch } = useGlobalContext();
  const Navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    
  });
  const [errors, setErrors] = useState({})
  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get(`user/${userId}`);

        const { username, email } = res.data;
        setUser({ ...user, username,email});
      } catch (err) {
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          dispatch({ type: "set_user", payload: {} });
          Navigate("/");
        }
      }
    }
    getUser();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const {username, email} = user
      await userSchema.validate({username, email,password: "454532f3"}, {abortEarly: true});
      await axios.patch(`user/${userId}`, {username,email});
      toast.success("Updated successfully");
    } catch (err) {
        console.log(err);
        
      if (err.name === "ValidationError") {
        toast.warning(err.message)
      }else if(err?.response?.status === 401 || err?.response?.status === 403) {
        dispatch({type:"set_user", payload: {}})
      }
    }
  }

  
  return (
    <Fragment>
        <form action=""  className="mx-auto mt-12 p-6 border-2 rounded-sm items-center flex-col w-[500px]" onSubmit={handleSubmit}>
            <InputCmp 
            type={'text'}
            name={"username"}
            value={user.username}
            handleChange={handleChange}/>
            <InputCmp
            type="email" 
            name={"email"}
            value={user.email}
            handleChange={handleChange}/>
            <Button type={"submit"} className="bg-[#0336FF] w-full font-medium text-white" label={"Edit"}/>
        </form>
    </Fragment>
  );
}

export default EditUser;
