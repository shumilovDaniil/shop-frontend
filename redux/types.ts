export interface IProduct {
  id?: number
  productId?: number
  name: string,
  categoryId: number,
  categoryName?: string,
  features?: string[],
  info: string,
  price: number,
  rating: number,
  featureValue: {
    FeatureId: number,
    FeatureValue: string
  }
}

export interface ICategory {
  name: string,
  categoryId: number,
  parentCategoryId: null,
  features: IFeature[]
}

export interface IFeature {
  categoryId?: number
  name: string
}

export type addCategoryType = {
  name: string,
  parentCategoryId: number,
}

export type addProductType = {
  name: string,
  categoryId: number,
  info: string,
  price: number,
  rating: number,
}