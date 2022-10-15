import React from "react"
import CategoryFormCreator from "./Category/Form/CategoryFormCreator"
import ProductsTable from "./Category/Table/ProductsTable"
import CategoriesTable from "./Product/Table/CategoriesTable"

const AdminPanel = () => {
  return (
    <div className="p-4 flex">
      <div className="forms_wrapper flex flex-col border-r-4 border-blue-600 pr-4">
        <CategoryFormCreator />
        {/*<ProductFormCreator />*/}
      </div>

      <div className="flex gap-2 flex-col">
        <ProductsTable />
        <CategoriesTable />
      </div>
    </div>
  )
}

export default AdminPanel