import React, { FC, useEffect, useState } from "react"
import { useCreateCategoryFeatureMutation, useDeleteCategoryMutation } from "../../../../../redux/services/shopApi"
import { ICategory, ICategoryChild, ICategoryFeature } from "../../../../../types/categories.types"
import CategoryRowChild from "../../../Category/Table/Row/CategoryRowChild"
import { MdExpandMore, MdExpandLess } from "react-icons/md"

interface CategoryRowProps {
  name: string
  categoryId: number
  parentCategoryId: null
  features: ICategoryFeature[]
  categories: ICategory[]
  childCategories: ICategoryChild[]
}

const CategoryRow: FC<CategoryRowProps> = ({
                                             categories,
                                             features,
                                             categoryId,
                                             name,
                                             parentCategoryId,
                                             childCategories,
                                           }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [featuresInput, setFeaturesInput] = useState("")
  const [isShow, setIsShow] = useState(false)
  const [deleteCategory] = useDeleteCategoryMutation()
  const [addFeature] = useCreateCategoryFeatureMutation()

  const getCategoryParent = (id: number) => {
    const categoryParent = categories.find((category: ICategory) => category.categoryId === id)
    return categoryParent?.name
  }

  const handleDelete = async (id: number) => {
    await deleteCategory(id)
  }

  const handleAddFeature = async (id: number) => {
    setIsEdit(!isEdit)

    if (isEdit) {
      const rawFeature = featuresInput
      const readyFeatures: any = []
      rawFeature
        .split(",")
        .forEach((item) => {
          readyFeatures.push({ name: item.trim().toLowerCase() })
        })

      readyFeatures.forEach((feature: ICategoryFeature) => {
        feature = {
          categoryId: id,
          name: feature.name,
        }
        addFeature(feature)
      })
    }
  }

  return (
    <div className="flex-table flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex-table_column flex">

          <span>{categoryId}</span>
          {childCategories.length > 0 &&
            <span className="text-2xl ml-4">
              {isShow ?
                <button onClick={() => setIsShow(!isShow)}><MdExpandLess /></button>
                :
                <button onClick={() => setIsShow(!isShow)}><MdExpandMore /></button>}
            </span>}

        </div>
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
      {childCategories.length > 0 && isShow ? childCategories.map((category) => {
        return (
          <CategoryRowChild key={category.id} categories={categories} {...category} />
        )
      }) : ""}
    </div>
  )
}

export default CategoryRow