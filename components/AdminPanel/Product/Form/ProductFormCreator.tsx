import React, { useState } from "react"
import CategorySelect from "../../ui/CategorySelect"
import { useAddProductMutation } from "../../../../redux/services/shopApi"
import { addProductType } from "../../../../redux/types"

const ProductFormCreator = () => {
  const [isShow, setIsShow] = useState(false)
  const [name, setName] = useState("")
  const [categoryId, setCategoryId] = useState(0)
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [rating, setRating] = useState(0)

  const [addProduct] = useAddProductMutation()

  const createProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (name && description && price && rating) {
      console.log(1)
      const product: addProductType = {
        name,
        categoryId: Number(categoryId),
        info: description,
        price: Number(price),
        rating: Number(rating),
      }
      addProduct(product)
    }
  }

  const getCategoryId = (id: number) => {
    setCategoryId(id)
  }

  return (
    <div className="form_wrapper">
      <button className="btn_blue" onClick={() => setIsShow(!isShow)}>Создание продукта</button>
      {isShow && <form className="form" onSubmit={(e) => createProduct(e)}>
        <div className="mb-3">
          <div>
            <span>Название продукта</span>
            <input onChange={(e) => setName(e.target.value)} value={name} type="text" />
          </div>
          <div>
            <span>ID категории</span>
            <CategorySelect getCategoryId={getCategoryId} />
          </div>
          <div>
            <span>Описание</span>
            <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" />
          </div>
          <div>
            <span>Цена</span>
            <input onChange={(e) => setPrice(Number(e.target.value))} value={price} type="number" />
          </div>
          <div>
            <span>Рейтинг</span>
            <input onChange={(e) => setRating(Number(e.target.value))} value={rating} type="number" />
          </div>
        </div>
        <button className="btn_green">Создать товар</button>
      </form>}
    </div>
  )
}

export default ProductFormCreator