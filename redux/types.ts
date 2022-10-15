export interface IProduct {
  id: number
  name: string,
  categoryId: number,
  categoryName: string,
  features: string[],
  info: string,
  price: number,
  rating: number
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


