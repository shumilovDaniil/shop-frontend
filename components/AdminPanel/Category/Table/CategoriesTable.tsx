import React, { useState } from "react"
import CategoryRow from "./Row/CategoryRow"
import { useGetCategoriesTreeQuery } from "../../../../redux/services/shopApi"
import { ICategory } from "../../../../types/categories.types"

const CategoriesTable = () => {
  const [isShow, setIsShow] = useState(true)
  const { data: categories, isLoading } = useGetCategoriesTreeQuery()

  return (
    <div>
      <h2 className="cursor-pointer btn_blue inline-block" onClick={() => setIsShow(!isShow)}>Список
        категорий</h2>

      {isShow && <div>
        <div className="flex-table flex-table--top justify-between text-white p-2 ">
          <div className="flex-table_column">id</div>
          <div className="flex-table_column">Категория</div>
          <div className="flex-table_column">Родительская категория</div>
          <div className="flex-table_column">Параметры</div>
          <div className="flex-table_column">Действия</div>
        </div>
        {categories?.map((category: ICategory) => {
          return (
            <CategoryRow
              categories={categories}
              key={category.categoryId}
              {...category}
            />
          )
        })}
      </div>}
    </div>
  )
}

export default CategoriesTable