import React, { useState } from "react"
import CategoryRow from "./Row/CategoryRow"
import { useGetCategoriesQuery } from "../../../../redux/services/shopApi"
import { ICategory } from "../../../../redux/types"

const CategoriesTable = () => {
  const [isShow, setIsShow] = useState(true)
  const { data: categories, isLoading } = useGetCategoriesQuery()

  return (
    <div>
      <h2 className="cursor-pointer btn_blue inline-block" onClick={() => setIsShow(!isShow)}>Список
        категорий</h2>

      {isShow && <table className="table categories">
        <thead className="product_col">
        <tr className="product_item product_col">
          <th>id</th>
          <th>Категория</th>
          <th>Родительская категория</th>
          <th>Параметры</th>
          <th>Действия</th>
        </tr>
        </thead>
        <tbody className="product_col">
        {categories?.map((category: ICategory) => {
          return (
            <CategoryRow
              categories={categories}
              key={category.categoryId}
              {...category}
            />
          )
        })}
        </tbody>
      </table>}
    </div>
  )
}

export default CategoriesTable