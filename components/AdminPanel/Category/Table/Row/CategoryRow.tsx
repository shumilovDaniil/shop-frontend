import React, { FC, useState } from "react"
import { useCreateCategoryFeatureMutation, useDeleteCategoryMutation } from "../../../../../redux/services/shopApi"
import { ICategory, ICategoryChild, ICategoryFeature, ICategoryParent } from "../../../../../types/categories.types"
import { MdExpandLess, MdExpandMore } from "react-icons/md"
import global from "./../../../../../styles/main.module.scss"

interface CategoryRowProps {
  name: string
  categoryId?: number
  id: number
  parentCategory: ICategoryParent | null
  parentCategoryId: number | null
  features: ICategoryFeature[]
  categories: ICategory[]
  childCategories: ICategoryChild[] | [],
}

const CategoryRow: FC<CategoryRowProps> = ({
                                             categories,
                                             features,
                                             categoryId,
                                             name,
                                             parentCategory,
                                             parentCategoryId,
                                             childCategories,
                                             id,
                                           }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [featuresInput, setFeaturesInput] = useState("")
  const [isShow, setIsShow] = useState(false)
  const [deleteCategory] = useDeleteCategoryMutation()
  const [addFeature] = useCreateCategoryFeatureMutation()

  const getCategoryParent = (id: number) => {
    const categoryParent = categories?.find((category: ICategory) => category.categoryId === id)
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
          <span>{categoryId || id}</span>
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
              <span
                className="bg-blue-500 px-2 text-white"
                key={`${feature.name}_`}
              >
                {feature.name}
              </span>
            )
          })}
          {isEdit && <div>
            <span className="text-black p-1 inline-block mb-2 bg-amber-300">Параметры (через запятую)</span>
            <textarea onChange={(e) => setFeaturesInput(e.target.value)}
                      value={featuresInput}
                      cols={40}
                      rows={3}>
            </textarea>
          </div>}
        </div>
        <div className="flex-table_column">
          {isEdit ?
            <div className="flex flex-row gap-2 ml-2">
              <button
                className={global.btn_green}
                onClick={() => handleAddFeature(categoryId || id)}
              >
                Save
              </button>
              <button className={global.btn_gray} onClick={() => setIsEdit(!isEdit)}>Cancel</button>
            </div>
            :
            <div className="flex gap-2">
              <button className={global.btn_red} onClick={() => handleDelete(categoryId || id)}>
                Delete
              </button>
              <button className={global.btn_green} onClick={() => handleAddFeature(categoryId || id)}>
                Add features
              </button>
            </div>}
        </div>
      </div>
      {childCategories.length > 0 && isShow ? childCategories.map((category) => {
          return (
            <CategoryRow key={category.id} {...category} />
          )
        })
        : ""}
    </div>
  )
}

export default CategoryRow