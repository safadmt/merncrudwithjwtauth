import React, { useEffect ,useState,useTransition} from 'react'
import Card from '../../../components/card/Card'
import axios from 'axios'
import './home.css'

function Home() {
  const [isPending, startTransition] = useTransition()
  const [products, setProducts] = useState([])
  useEffect(()=> {
    async function getProduct(params) {
      const response = await axios.get('product/all')
      console.log(response)
      startTransition(()=> {
        setProducts(response.data)
      })
    }
    getProduct()
  },[])
  return (
    <div>
      <div className=''>
        {isPending ? <div>Loading...</div> : products.length === 0 ? <div>No products</div> : 
        <div className='product-display-div m-6 '>
          {
            products?.map((item)=> {
              return <Card key={item.product_id} item={item}/>
            })
          }
        </div> }
        </div>
    </div>
  )
}

export default Home