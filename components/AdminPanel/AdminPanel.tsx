import React from "react"
import CategoryFormCreator from "./Category/Form/CategoryFormCreator"
import ProductsTable from "./Product/Table/ProductsTable"
import CategoriesTable from "./Category/Table/CategoriesTable"
import ProductFormCreator from "./Product/Form/ProductFormCreator"
import style from "./AdminPanel.module.scss"

const AdminPanel = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.form}>
        <CategoryFormCreator />
        <ProductFormCreator />
      </div>

      <div className={style.table}>
        <ProductsTable />
        <CategoriesTable />
      </div>
    </div>
  )
}

export default AdminPanel