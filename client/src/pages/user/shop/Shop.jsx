import React, { useEffect, useState, useTransition } from "react";
import axios from "axios";
import "./shop.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../../context&reducer/context";
import Card from "../../../components/card/Card";
import { LineSpinner } from "../../../components/spinners/Spinner";

function Shop() {
  const [isPending, startTransition] = useTransition();
  const [products, setProducts] = useState([]);
  const { state, dispatch } = useGlobalContext();
  const Navigate = useNavigate();

  useEffect(() => {
    getProduct();
  }, []);
  async function getProduct() {
    try {
        
      const response = await axios.get("api/users/products/");
      console.log(response);
      
      startTransition(() => {
        setProducts(response.data.data);
      });
    } catch (err) {
      console.log(err);

      if (err?.response?.status === 401 || err?.response?.status === 403) {
        toast.warning("Not authorized. Please login");
        dispatch({ type: "set_user", payload: {} });
        Navigate("/");
      } else {
        console.log(err);
      }
    }
  }
  return (
    <div>
      <div className="">
        {isPending ? (
          <div className="">
            <div className="flex justify-center py-32"><LineSpinner size={45} color={"black"} /></div>
          </div>
        ) : (
          <div className=" ">
            <h1 className="text-center mt-10 font-bold text-xl">Products</h1>
            <div className="p-10 product-display-div">
            {products?.map((item) => {
              return <Card key={item.product_id} item={item} />;
            })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;
