import React, { useState } from "react"

const FeatureEditor = (feature: ProductFeature) => {
  const [name, setName] = useState("")
  const [value, setValue] = useState("")

  return (
    <div className="flex">
      <input onChange={(e) => setName(e.target.value)} value={feature.name} type="text" />
      <input onChange={(e) => setValue(e.target.value)} value={feature.value} type="text" />
    </div>
  )
}

export default FeatureEditor