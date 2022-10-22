import React, { useState } from "react"
import CategoryRow from "./Row/CategoryRow"
import { useGetCategoriesTreeQuery } from "../../../../redux/services/shopApi"
import { ICategory } from "../../../../types/categories.types"
import global from "../../../../styles/main.module.scss"

const CategoriesTable = () => {
  const [isShow, setIsShow] = useState(true)
  const { data: categories, isLoading } = useGetCategoriesTreeQuery()

  return (
    <div className="mt-5">
      <h2 className={global.btn} onClick={() => setIsShow(!isShow)}>
        Список категорий
      </h2>

      {isShow && <div className="mt-2">
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