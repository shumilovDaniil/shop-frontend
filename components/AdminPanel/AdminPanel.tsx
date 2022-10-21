import React from "react"
import CategoryFormCreator from "./Category/Form/CategoryFormCreator"
import ProductsTable from "./Category/Table/ProductsTable"
import CategoriesTable from "./Product/Table/CategoriesTable"
import ProductFormCreator from "./Product/Form/ProductFormCreator"

const AdminPanel = () => {
  return (
    <div className="p-4 flex">
      <div className="forms_wrapper flex flex-col pr-4">
        <CategoryFormCreator />
        <ProductFormCreator />
      </div>

      <div className="flex gap-2 flex-col w-full">
        <ProductsTable />
        <CategoriesTable />
      </div>
    </div>
  )
}

export default AdminPanel