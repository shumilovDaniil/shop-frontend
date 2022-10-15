import React, { useState } from "react"
import CategorySelect from "../../ui/CategorySelect"

const CategoryFormCreator = () => {
  const [isShow, setIsShow] = useState(false)
  const [name, setName] = useState("")
  const [error, setError] = useState({ isError: false, errorInfo: [] })
  const [categoryId, setCategoryId] = useState(0)

  const createCategory = async (e, name, categoryId) => {
    e.preventDefault()

    if (name) {
      const res = await fetch("http://shopyshop.somee.com/AdminPanel/CreateCategory", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          parentCategoryId: categoryId,
        }),
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => getCategories())
    } else {
      setError({
        isError: true, errorInfo: [{
          name: name || typeof name,
          categoryId: categoryId || typeof categoryId,
        }],
      })
    }
  }

  const getCategoryId = (id) => {
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
            <CategorySelect categories={categories} getCategoryId={getCategoryId} />
          </div>
        </div>
        <button className="btn_green">Создать категорию</button>
        {error.isError ? error.errorInfo.map((error, idx) => {
          return (
            <div key={error.name + idx}>
              <span>Ошибка!</span>
              <span>name: {error.name}</span>
              <span>parentName: {error.parentName}</span>
            </div>
          )
        }) : ""}
      </form>
      }
    </div>
  )
}

export default CategoryFormCreator