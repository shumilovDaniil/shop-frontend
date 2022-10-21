export interface IProduct {
  id?: number
  productId?: number
  name: string,
  categoryId: number | null,
  categoryName?: string,
  features?: IProductFeatures[],
  info: string,
  price: number,
  rating: number,
  featureValue: {
    FeatureId: number,
    FeatureValue: string
  }
}

export interface IProductFeatures {
  name: string,
  value: string
}

export type AddProductType = {
  name: string,
  categoryId: number,
  info: string,
  price: number,
  rating: number,
}

