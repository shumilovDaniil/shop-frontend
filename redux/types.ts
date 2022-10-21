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

export type AddProductType = {
  name: string,
  categoryId: number,
  info: string,
  price: number,
  rating: number,
}

