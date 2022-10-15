import React, { useEffect, useState } from "react"

const CategorySelect = ({ categories, getCategoryId }) => {
  const [categoryId, setCategoryId] = useState(0)

  useEffect(() => {
    const id = Number(categoryId)

    if (id) {
      getCategoryId(id)
      console.log(id, 1)
    } else {
      getCategoryId(null)
    }
  }, [categoryId])


  return (
    <>
      <select
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option value={null} defaultChecked>Без категории</option>
        {categories.map((category) => {
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