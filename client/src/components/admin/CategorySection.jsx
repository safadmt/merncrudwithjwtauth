import React, { memo, useState } from 'react'
import Button from '../ui/Button';
import useCategories from '../../hooks/useCategories';
import axios from 'axios';
import EntityTable from '../tables/EntityTable';
import EntityForm from '../form/EntityForm';

function CategorySection() {
  const [category, setCategory] = useState("")
    const {categories,
      createCategory,
      deleteCategory,
      updateCategory,
      handleError} = useCategories(setCategory)
    const [showForm, setShowForm] = useState(false);
    const [formHeading, setFormHeading] = useState({heading:"",state:""})
    const [editingCategory, setEditingCategory] = useState(null);
    const tableColumnHeading = ["sl num", "Category name","Date created", "Date updated"  ]

    function editCategory (categoryid) {
      
      
      axios.get(`api/categories/${categoryid}`)
      .then(response=> {
        
        setCategory(response?.data?.data.category_name)
        setEditingCategory(response?.data?.data)
        setFormHeading({...formHeading, heading:"Update category", state:"edit"})
        setShowForm(true)
      })
      .catch(err=> {
        handleError(err)
      })
    
    }

    function handleSubmit () {
      event.preventDefault()
      
      if(formHeading.state === "create") {
        createCategory(category)
      }else if(formHeading.state === "edit"){
        if(!category || category === editingCategory.category_name) {
          return 
        }else{
          updateCategory(category, editingCategory.category_id)
        }
      }
    }
  return (
    <>
        <div>
          <Button 
          className={'bg-[#252422] shadow-md text-white rounded-lg shadow-[#252422]'} 
          label={"Add New Category"}
          onClick={()=> {setShowForm(true) , setFormHeading({...formHeading,heading:"Create new category",state:"create"})}}/>
        </div>
        {showForm && <div className={"overlay"}>
          <EntityForm 
        handleChange={(e)=> setCategory(e.target.value)} 
        state={category}
        handleSubmit={handleSubmit}
        label={"Category"}
        btnlabel={formHeading.state === "create" ? "Submit Category" : "Update category"}
        mainHeading={formHeading.heading}
        onCancel={()=> {setShowForm(false), setCategory("")}}/>
        </div>}
        {categories?.length > 0 &&<EntityTable 
       data={categories}
       edit={editCategory}
       deleteItem={deleteCategory}
       columnHeading={tableColumnHeading}
       itemid={"category_id"}/>}
    </>
  )
}

export default memo(CategorySection) 