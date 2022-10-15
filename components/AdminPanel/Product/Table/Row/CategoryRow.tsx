import React, { FC, useState } from "react"
import { ICategory, IFeature } from "../../../../../redux/types"
import { useCreateCategoryFeatureMutation, useDeleteCategoryMutation } from "../../../../../redux/services/shopApi"

interface CategoryRowProps {
  name: string;
  categoryId: number;
  parentCategoryId: null;
  features: IFeature[];
  categories: ICategory[];
}

const CategoryRow: FC<CategoryRowProps> = ({ categories, features, categoryId, name, parentCategoryId }) => {

  const [isEdit, setIsEdit] = useState(false)
  const [featuresInput, setFeaturesInput] = useState("")
  const [deleteCategory] = useDeleteCategoryMutation()
  const [addFeature] = useCreateCategoryFeatureMutation()

  const getCategoryParent = (id: number) => {
    let categoryParent = categories.find((category: ICategory) => category.categoryId === id)
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

      readyFeatures.forEach((feature: IFeature) => {
        feature = {
          categoryId: id,
          name: feature.name,
        }
        addFeature(feature)
      })
    }
  }

  return (
    <tr key={categoryId} className="product_item product_col">
      <td>{categoryId}</td>
      <td>{name}</td>
      <td>{parentCategoryId ? getCategoryParent(parentCategoryId) : ""}</td>
      <td>
        {features?.map((feature: IFeature) => {
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
      </td>
      <td className="flex">
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
      </td>
    </tr>
  )
}

export default CategoryRow