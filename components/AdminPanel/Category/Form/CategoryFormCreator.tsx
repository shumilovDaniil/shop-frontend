import React, { useState } from "react"
import CategorySelect from "../../ui/CategorySelect"
import { useAddCategoryMutation } from "../../../../redux/services/shopApi"
import { AddCategoryType } from "../../../../types/categories.types"
import global from "./../../../../styles/main.module.scss"

const CategoryFormCreator = () => {
  const [isShow, setIsShow] = useState(true)
  const [name, setName] = useState("")
  const [parentCategoryId, setCategoryId] = useState<number | null>(0)
  const [addCategory] = useAddCategoryMutation()

  const createCategory = async (e: React.FormEvent<HTMLFormElement>, { name, parentCategoryId }: AddCategoryType) => {
    e.preventDefault()

    if (name) {
      await addCategory({
        name,
        parentCategoryId,
      })
    }
  }

  const getCategoryId = (id: number | null) => setCategoryId(id)

  return (
    <div>
      <button
        className={`${global.btn} ${global.btn__full}`}
        onClick={() => setIsShow(!isShow)}>
        Создание категории
      </button>

      {isShow &&
        <form
          className={global.form}
          onSubmit={(e) => createCategory(e, { name, parentCategoryId })}
        >
          <div className="mb-3">
            <div>
              <span>Название категории</span>
              <input
                onChange={(el) => setName(el.target.value)}
                value={name}
                type="text"
              />
            </div>
            <div>
              <span>Родительская категория</span>
              <CategorySelect getCategoryId={getCategoryId} />
            </div>
          </div>
          <button className={global.btn_green}>Создать категорию</button>
        </form>}
    </div>
  )
}

export default CategoryFormCreator