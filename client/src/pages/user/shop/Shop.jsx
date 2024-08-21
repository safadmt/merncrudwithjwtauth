import React, { useEffect, useState, useTransition } from "react";
import axios from "axios";
import "./shop.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../../context&reducer/context";
import Card from "../../../components/card/Card";

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
        
      const response = await axios.get("product/all");
      console.log(response, "resp");
      startTransition(() => {
        setProducts(response.data);
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
          <div>Loading...</div>
        ) : products.length === 0 ? (
          <div>No products</div>
        ) : (
          <div className="product-display-div m-6 ">
            {products?.map((item) => {
              return <Card key={item.product_id} item={item} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;
