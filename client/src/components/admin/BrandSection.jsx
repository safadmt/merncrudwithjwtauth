import React, {  memo, useState } from 'react'
import Button from '../ui/Button'
import useBrands from '../../hooks/useBrands'
import axios from 'axios'
import { toast } from 'react-toastify'
import EntityTable from '../tables/EntityTable'
import EntityForm from '../form/EntityForm'

function BrandSection() {
  const [brand, setBrand] = useState("");
    const { brands,handleError, error,deleteBrand, updateBrand, createBrand } = useBrands(setBrand);
    const [showForm, setShowForm] = useState(false);
    const [formHeading,setFormHeading] = useState({heading:"", state:""})
    const [editBrandInfo, setEditBrandInfo] = useState(null)
    const tableColumnHeading = ["sl num", "Brand name","Date created", "Date updated"  ]
    
    const editBrand = async (brandid) => {
      try{
        const response = await axios.get(`api/brands/${brandid}`)
        setEditBrandInfo(response.data?.data)
        setFormHeading({...formHeading, heading:"Edit brand", state: "edit"})
        setBrand(response.data?.data?.brand_name) 
        setShowForm(true)
      }catch(err) {
        handleError(err)
      }
    }
    function handleSubmit () {
      event.preventDefault();
      
      if(!brand) {
        toast.warning("Brand name is required")
      } 
      
      if(formHeading.state === "create") {
        createBrand(brand)
      }else if(formHeading.state === "edit"){
        if(brand === editBrandInfo.brand_name) {
          return
        }else{          
          updateBrand(brand, editBrandInfo.brand_id)
        }
      }
    }
  return (
    <>
        <div className=''>
          <Button 
          className={'bg-[#252422] shadow-md text-white rounded-lg shadow-[#252422]'} 
          label={"Add New Brand"}
          onClick={(()=> {
            setShowForm(true)
            setFormHeading({...formHeading,heading:"Create new brand", state:"create"})
          })}
          />
        </div>
        {showForm  && <div className={"overlay"}>
          <EntityForm
        handleChange={(e)=> setBrand(e.target.value)} 
        state={brand}
        handleSubmit={handleSubmit}
        label={"Brand"}
        btnlabel={formHeading.state === "create" ? "Submit Brand" : "Update Brand"}
        onCancel={()=> {setShowForm(false), setBrand("")}}
        mainHeading={formHeading.heading}/>
        </div>}
        
       {brands.length > 0 &&<EntityTable 
       data={brands} edit={editBrand} 
       deleteItem={deleteBrand}
       columnHeading={tableColumnHeading}
       itemid={"brand_id"}/>}
    </>
  )
}

export default memo(BrandSection) 