import React, { useEffect, useState } from "react"
import { useGetCategoriesQuery } from "../../../redux/services/shopApi"

const CategorySelect = ({ getCategoryId }) => {
  const [categoryId, setCategoryId] = useState(0)

  useEffect(() => {
    const id = Number(categoryId)
    
    if (id) {
      getCategoryId(id)
    } else {
      getCategoryId(null)
    }
  }, [categoryId])

  const { data: categories, isLoading } = useGetCategoriesQuery()

  return (
    <>
      <select
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option value={null} defaultChecked>Без категории</option>
        {categories?.map((category) => {
          return (
            <option
              key={category.categoryId}
              value={category.categoryId}
            >
              {category.name} ({category.categoryId})
            </option>
          )
        })}
      </select>
    </>
  )
}
export default CategorySelect