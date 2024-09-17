import { useEffect, useState, useTransition } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context&reducer/context";

export const useGetUsers = (refresh) => {
  const [users, setUsers] = useState([]);
  const [isPending, startTransition] = useTransition();
  const { dispatch } = useGlobalContext();
  const Navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get("api/users/");
        startTransition(() => {
          setUsers(response.data.data);
        });
      } catch (err) {
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          dispatch({ type: "set_user", payload: {} });
          Navigate("/auth/admin-login");
        }else{
            console.log(err);
            
        }
      }
    }
    getUser();
  }, [refresh]);

  return { users, isPending ,setUsers};
};
