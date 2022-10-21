import React, { useState } from "react"
import CategorySelect from "../../ui/CategorySelect"
import { useAddProductMutation } from "../../../../redux/services/shopApi"
import { AddProductType } from "../../../../types/products.types"
import global from "./../../../../styles/main.module.scss"

const ProductFormCreator = () => {
  const [isShow, setIsShow] = useState(true)
  const [name, setName] = useState("")
  const [categoryId, setCategoryId] = useState<number | null>(0)
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [rating, setRating] = useState(0)

  const [addProduct] = useAddProductMutation()

  const createProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (name && description && price && rating) {
      const product: AddProductType = {
        name,
        categoryId: Number(categoryId),
        info: description,
        price: Number(price),
        rating: Number(rating),
      }
      addProduct(product)

      setName("")
      setCategoryId(0)
      setDescription("")
      setPrice(0)
      setRating(0)
    }
  }

  const getCategoryId = (id: number | null) => {
    setCategoryId(id)
  }

  return (
    <div className={global.form_wrapper}>
      <button className={global.btn_blue__full} onClick={() => setIsShow(!isShow)}>Создание продукта</button>
      {isShow && <form className={global.form} onSubmit={(e) => createProduct(e)}>
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
        <button className={global.btn_green}>Создать товар</button>
      </form>}
    </div>
  )
}

export default ProductFormCreator