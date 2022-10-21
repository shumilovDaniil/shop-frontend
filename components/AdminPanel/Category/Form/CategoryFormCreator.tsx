import React, { useState } from "react"
import CategorySelect from "../../ui/CategorySelect"
import { useAddCategoryMutation } from "../../../../redux/services/shopApi"
import { AddCategoryType } from "../../../../redux/types"

const CategoryFormCreator = () => {
  const [isShow, setIsShow] = useState(true)
  const [name, setName] = useState("")
  const [categoryId, setCategoryId] = useState(0)

  const [addCategory] = useAddCategoryMutation()

  const createCategory = async (e: React.FormEvent<HTMLFormElement>, name: string, categoryId: number) => {
    e.preventDefault()

    const category = {
      name,
      parentCategoryId: categoryId,
    }

    if (name) {
      await addCategory(category)
    }
  }

  const getCategoryId = (id: number) => {
    setCategoryId(id)
  }

  return (
    <div>
      <button className="btn_blue" onClick={() => setIsShow(!isShow)}>Создание категории</button>
      {isShow && <form className="form" onSubmit={(e) => createCategory(e, name, categoryId)}>
        <div className="mb-3">
          <div>
            <span>Название категории</span>
            <input onChange={(el) => setName(el.target.value)} value={name} type="text" />
          </div>
          <div>
            <span>Родительская категория</span>
            <CategorySelect getCategoryId={getCategoryId} />
          </div>
        </div>
        <button className="btn_green">Создать категорию</button>
      </form>
      }
    </div>
  )
}

export default CategoryFormCreator