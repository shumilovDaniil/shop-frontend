import React, { useEffect, useState } from "react"
import CategorySelect from "../../ui/CategorySelect"
import axios from "axios"

const ProductFormCreator = ({ getProducts }) => {
  const [isShow, setIsShow] = useState(false)

  const [name, setName] = useState()
  const [categoryId, setCategoryId] = useState()
  const [description, setDescription] = useState()
  const [price, setPrice] = useState()
  const [rating, setRating] = useState()
  const [error, setError] = useState({ isError: false, errorInfo: [] })
  const [categories, setCategories] = useState([])

  const createProduct = async (e) => {
    e.preventDefault()
    setError({ isError: false, errorInfo: [] })

    if (name && description && price && rating) {
      const res = await fetch("http://shopyshop.somee.com/AdminPanel/CreateProduct", {
        method: "POST",
        body: JSON.stringify({
          name,
          categoryId: Number(categoryId),
          info: description,
          price: Number(price),
          rating: Number(rating),
        }),
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => getProducts())
    } else {
      setError({
        isError: true, errorInfo: [{
          name: name || typeof name,
          categoryId: Number(categoryId) || typeof categoryId,
          info: description || typeof info,
          price: Number(price) || typeof price,
          rating: Number(rating) || typeof rating,
        }],
      })
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = async () => {
    const res = axios.get(`http://shopyshop.somee.com/Shop/GetCategories`).then(res => {
      setCategories(res.data)
    })
  }

  const getCategoryId = (id) => {
    setCategoryId(id)
  }

  return (
    <div>
      <button className="btn_blue" onClick={() => setIsShow(!isShow)}>Создание продукта</button>
      {isShow && <form className="form" onSubmit={(e) => createProduct(e)}>
        <div className="mb-3">
          <div>
            <span>Название продукта</span>
            <input onChange={(e) => setName(e.target.value)} value={name} type="text" />
          </div>
          <div>
            <span>ID категории</span>
            <CategorySelect categories={categories} getCategoryId={getCategoryId} />
          </div>
          <div>
            <span>Описание</span>
            <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" />
          </div>
          <div>
            <span>Цена</span>
            <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" />
          </div>
          <div>
            <span>Рейтинг</span>
            <input onChange={(e) => setRating(e.target.value)} value={rating} type="number" />
          </div>
        </div>
        <button className="btn_green">Создать товар</button>
        {error.isError ? error.errorInfo.map((error) => {
          return (
            <div>
              <span>Ошибка!</span>
              <span>name: {error.name}</span>
              <span>categoryId: {error.categoryId}</span>
              <span>info: {error.info}</span>
              <span>price: {error.price}</span>
              <span>rating: {error.rating}</span>
            </div>
          )
        }) : ""}
      </form>}
    </div>
  )
}

export default ProductFormCreator