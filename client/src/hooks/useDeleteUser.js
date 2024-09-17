import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useDeleteUser = (setUsers) => {
  const Navigate = useNavigate();

  const handleDelete = async (id, users) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this user",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`api/users/${id}`);
        const userInfo = users.filter((user) => user.user_id !== id);
        setUsers(userInfo);
        Swal.fire({
          title: "Deleted!",
          text: "User has been deleted.",
          icon: "success",
        });
      }
    } catch (err) {
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        toast.warning("Please login");
        Navigate("/");
      } else {
        console.log(err);
      }
    }
  };

  return { handleDelete };
};
