import React, { useEffect, useState } from "react"
import CategorySelect from "../../../ui/CategorySelect"
import { IProduct } from "../../../../../redux/types"
import { useDeleteProductMutation, useEditProductMutation } from "../../../../../redux/services/shopApi"

const ProductRow = (product: IProduct) => {
  const [isEdit, setIsEdit] = useState(false)
  const [id, setId] = useState(product.id)
  const [name, setName] = useState(product.name)
  const [categoryId, setCategoryId] = useState(product.categoryId)
  const [categoryName, setCategoryName] = useState(product.categoryName)
  const [features, setFeatures] = useState(product.features)
  const [info, setInfo] = useState(product.info)
  const [price, setPrice] = useState(product.price)
  const [rating, setRating] = useState(product.rating)
  const [showMore, setShowMore] = useState(false)
  const [categories, setCategories] = useState([])

  const [deleteProduct] = useDeleteProductMutation()
  const [editProduct] = useEditProductMutation()


  const handleEdit = async () => {
    const product: IProduct = {
      productId: id,
      name,
      categoryId,
      info,
      price: Number(price),
      rating: Number(rating),
    }
    await editProduct(product)


    try {
      const res = await fetch("http://shopyshop.somee.com/AdminPanel/EditProduct", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "productId": id,
          "name": name,
          "categoryId": categoryId,
          "info": info,
          "price": Number(price),
          "rating": Number(rating),
        }),
      })
        .then(() => product.getProducts())
    } catch (error) {
      throw new Error(error)
    }
    setIsEdit(!isEdit)
  }

  const handleDelete = async (id: number) => {
    await deleteProduct(id)
  }

  // const getCategories = async () => {
  //   const res = axios.get(`http://shopyshop.somee.com/Shop/GetCategories`).then(res => {
  //     setCategories(res.data)
  //   })
  // }

  // const getCategoryId = (id) => {
  //   setCategoryId(id)
  // }

  return (
    <>
      <tr className="product_item product_col">
        <td>{product.id}</td>
        <td className="flex flex-col items-start">
          <p>{product.name}</p>
          {isEdit && <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />}
        </td>

        {/*<td className="flex flex-col items-start">*/}
        {/*  {product.categoryName}*/}
        {/*  {isEdit && <CategorySelect categories={categories} getCategoryId={getCategoryId} />}*/}
        {/*</td>*/}

        <td className="col_descr flex flex-col">

          <p onClick={() => setShowMore(!showMore)}>{showMore ? product.info :
            product.info.length > 73 ? product.info.slice(0, 73) + ".." : product.info}</p>
          {isEdit && <textarea value={info} onChange={(e) => setInfo(e.target.value)} id=""
                               cols={25}
                               rows={5}></textarea>}
        </td>
        <td className="flex flex-col items-start">
          {product.rating}
          {isEdit && <input
            type="number" value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />}
        </td>
        <td className="flex flex-col items-start">
          {product.price}
          {isEdit && <input
            type="text" value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />}
        </td>
        <td className={"inline-block"}>
          {!isEdit && <button className="btn_red" onClick={() => handleDelete(id)}>Delete</button>}
          {
            isEdit ?
              <>
                <button
                  className="btn_green"
                  onClick={() => handleEdit()}>Save
                </button>
                <button className="btn_gray ml-2" onClick={() => setIsEdit(!isEdit)}>Cancel</button>
              </>
              :
              <button className="btn_orange ml-2" onClick={() => setIsEdit(!isEdit)}>Edit</button>
          }
        </td>
      </tr>
    </>
  )
}

export default ProductRow