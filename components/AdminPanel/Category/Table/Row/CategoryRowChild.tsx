import React, { FC, useState } from "react"
import { ICategory, ICategoryChild, ICategoryFeature, ICategoryParent } from "../../../../../types/categories.types"


interface CategoryRowChildProps {
  name: string,
  id: number
  parentCategory: ICategoryParent,
  childCategories: ICategoryChild,
  parentCategoryId: number,
  features: ICategoryFeature[],
  categories: ICategory[]
}

const CategoryRowChild: FC<CategoryRowChildProps> = ({
                                                       id,
                                                       name,
                                                       parentCategoryId,
                                                       parentCategory,
                                                       childCategories,
                                                       features,
                                                       categories,
                                                     }) => {
  const [isEdit, setIsEdit] = useState(false)

  const getCategoryParent = (id: number) => {
    let categoryParent = categories.find((category: ICategory) => category.categoryId === id)
    return categoryParent?.name
  }

  return (
    <div className="flex-table flex justify-between ml-14 items-center">
      <div className="flex-table_column">{id}</div>
      <div className="flex-table_column">{name}</div>
      <div className="flex-table_column">{parentCategoryId ? getCategoryParent(parentCategoryId) : ""}</div>
      <div className="flex-table_column">
        {features?.map((feature: ICategoryFeature) => {
          return (
            <span className="bg-blue-500 px-2 text-white"
                  key={`${feature.name}_`}>{feature.name}</span>
          )
        })}

        {
          isEdit && <div>
            <span className="text-black p-1 inline-block mb-2 bg-amber-300">Параметры (через запятую)</span>
            <textarea value={featuresInput} onChange={(e) => setFeaturesInput(e.target.value)} id=""
                      cols={40}
                      rows={3}></textarea>
          </div>
        }
      </div>
      <div className="flex-table_column">
        {isEdit ? <div className="flex flex-col">
            <button
              className="btn_green"
              onClick={() => handleAddFeature(categoryId)}>Save
            </button>
            <button className="btn_gray" onClick={() => setIsEdit(!isEdit)}>Cancel</button>
          </div>

          :
          <div>
            <button className="btn_red mb-2" onClick={() => handleDelete(categoryId)}>Delete</button>
            <button className="btn_blue" onClick={() => handleAddFeature(categoryId)}>Add
              features
            </button>
          </div>}
      </div>
    </div>


  )
}

export default CategoryRowChild