import axios from 'axios'
import React, { useEffect, useState, useTransition } from 'react'

function useFetchProducts(products, setProducts,handleServerError) {
    const [isPending, startTransition] = useTransition()
    useEffect(()=> {
        async function getProduct() {
            try{
            const response = await axios.get('api/products/')
            
            startTransition(()=> {
                setProducts(response.data.data)
            })   
            }catch(err) {
                handleServerError(err)
            }
            
        }
        getProduct();
    },[])
}

export default useFetchProducts