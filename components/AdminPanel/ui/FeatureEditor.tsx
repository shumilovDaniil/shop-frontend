import React, { useState } from "react"
import { IProductFeatures } from "../../../types/products.types"

const FeatureEditor = ({ name, value }: IProductFeatures) => {
  const [fName, setFName] = useState(name)
  const [fValue, setFValue] = useState(value)

  return (
    <div className="flex">
      <input onChange={(e) => setFName(e.target.value)} value={fName} type="text" />
      <input onChange={(e) => setFValue(e.target.value)} value={fValue} type="text" />
    </div>
  )
}

export default FeatureEditor