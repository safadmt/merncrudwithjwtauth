import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useGlobalContext } from "../context&reducer/context";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const useErrorHandler = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const { state, dispatch } = useGlobalContext();
  const Navigate = useNavigate();
  // Function to handle Yup validation errors
  const handleValidationError = (err, abortEarly = true) => {
    if (err.name === "ValidationError") {
      const formattedErrors = {};
      if (abortEarly) {
        // Handle single error (abortEarly: true)
        toast.error(err.message);
      } else {
        // Handle multiple errors (abortEarly: false)
        err.inner.forEach((error) => {
          formattedErrors[error.path] = error.message;
        });
      }
    }
  };

  // Function to handle server errors (Axios)
  const handleServerError = (err) => {
    console.log(err);

    if (axios.isAxiosError(err)) {
      if (err.response) {
        const { status, data } = err.response;
        if (status === 409 || status === 400 || status === 404) {
          console.log(err);

          Array.isArray(data?.error)
            ? toast.error(data.error[0].message)
            : toast.error(data.error);
        } else if (status === 403 || status === 401) {
          Swal.fire("Your session has ended. Please log in again to continue.");
          dispatch({ type: "set_user", payload: {} });
          Navigate("/auth/admin-login");
        } else if(status === 500) {
          toast.error(data)
        }else {
          // Server responded with a status code other than 2xx
          toast.error(
            `Server Error: ${
              err.response.data.message || "Something went wrong!"
            }`
          );
        }
      } else if (err.request) {
        // Request was made, but no response received
        toast.error("No response from server. Please try again.");
      } else {
        toast.error(`Request Error: ${err.message}`);
      }
    } else {
      // Handle unexpected errors
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  // Function to clear validation and server errors

  const authErrorHandler = (error) => {
    if (error.name === "ValidationError") {
      toast.warning(error.message);
    } else if (error?.response) {
      const { status, data } = error.response;
      if (status === 400 || status === 409 || status === 401) {
        Array.isArray(data?.error)
          ? toast.error(data.error[0])
          : toast.error(data.error);
      }else if(status === 500) {
        toast.error(data)
        
      } else {
        console.log(error.response);
      }
    } else if (error.request) {
      console.log(err.request);
    } else {
      console.log(error);
    }
  };
  return {
    authErrorHandler,
    handleValidationError,
    handleServerError,
  };
};

export default useErrorHandler;
