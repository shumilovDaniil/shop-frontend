import React, { FC, useEffect, useState } from "react"
import { useGetCategoriesQuery } from "../../../redux/services/shopApi"

interface CategorySelectProps {
  getCategoryId: (id: number | null) => void
}

const CategorySelect: FC<CategorySelectProps> = ({ getCategoryId }) => {
  const [categoryId, setCategoryId] = useState(0)

  useEffect(() => {
    categoryId ? getCategoryId(categoryId) : getCategoryId(null)
  }, [categoryId])

  const { data: categories, isLoading } = useGetCategoriesQuery()

  return (
    <>
      <select
        onChange={(e) => setCategoryId(Number(e.target.value))}
      >
        <option defaultChecked>Без категории</option>
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