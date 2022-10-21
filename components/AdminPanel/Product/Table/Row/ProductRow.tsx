import React, { useState } from "react"
import CategorySelect from "../../../ui/CategorySelect"
import { useDeleteProductMutation, useEditProductMutation } from "../../../../../redux/services/shopApi"
import FeatureEditor from "../../../ui/FeatureEditor"
import { IProduct } from "../../../../../types/products.types"

const ProductRow = (product: IProduct) => {
  const [isEdit, setIsEdit] = useState(false)
  const [id, setId] = useState(product.id)
  const [name, setName] = useState(product.name)
  const [categoryId, setCategoryId] = useState<number | null>(product.categoryId)
  const [categoryName, setCategoryName] = useState(product.categoryName)
  const [features, setFeatures] = useState(product.features)
  const [info, setInfo] = useState(product.info)
  const [price, setPrice] = useState(product.price)
  const [rating, setRating] = useState(product.rating)
  const [showMore, setShowMore] = useState(false)

  const [deleteProduct] = useDeleteProductMutation()
  const [editProduct] = useEditProductMutation()

  const handleEdit = async () => {
    const product: IProduct = {
      productId: id,
      name,
      categoryId,
      info,
      price,
      rating,
      featureValue: {
        FeatureId: 24,
        FeatureValue: "sss",
      },
    }
    await editProduct(product)

    setIsEdit(!isEdit)
  }

  const handleDelete = async (id: number) => {
    await deleteProduct(id)
  }

  const getCategoryId = (id: number | null) => {
    setCategoryId(id)
  }

  return (
    <>
      <tr className="product_item product_col">
        <td>{id}</td>
        <td className="flex flex-col items-start justify-center">
          <p>{name}</p>
          {isEdit && <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />}
        </td>

        <td className="flex flex-col items-start justify-center">
          {categoryName} ({categoryId})
          {isEdit && <CategorySelect getCategoryId={getCategoryId} />}
        </td>

        <td className="col_descr flex flex-col justify-center">

          <p onClick={() => setShowMore(!showMore)}>

            {showMore ? info : info.length > 63 ? info.slice(0, 63) + ".." : info}
          </p>

          {isEdit && <textarea value={info} onChange={(e) => setInfo(e.target.value)} id=""
                               cols={25}
                               rows={5}></textarea>}
        </td>
        <td className="flex flex-col items-start justify-center">
          {rating}
          {isEdit && <input
            type="number" value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />}
        </td>
        <td className="flex flex-col items-start justify-center">
          {price.toLocaleString("ru")}
          {isEdit && <input
            type="number" value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />}
        </td>
        <td className="inline-block">
          {features?.map((feature, idx) => {
            return (
              <div key={`${feature.name}_${idx}`}>
                <span>{feature.name} = </span>
                <span>{feature.value}</span>
                {isEdit && <FeatureEditor {...feature} />}
              </div>
            )
          })}
        </td>
        <td className={"flex justify-start"}>
          {!isEdit && id ? <button className="btn_red" onClick={() => handleDelete(id)}>Delete</button> : ""}
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