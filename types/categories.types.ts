export interface ICategory {
  name: string,
  categoryId: number,
  parentCategoryId: null,
  parentCategory: null | number,
  childCategories: ICategoryChild[] | [],
  features: ICategoryFeature[],
}

export interface ICategoryFeature {
  id?: number
  categoryId?: number
  name: string
}

export interface ICategoryChild {
  name: string,
  id: number
  parentCategory: ICategoryParent,
  childCategories: ICategoryChild,
  parentCategoryId: number,
  features: ICategoryFeature[],
}

export interface ICategoryParent {
  parentCategory: null,
  features: ICategoryFeature[],
  name: string,
  parentCategoryId: null | number,
  id: number
}

export type AddCategoryType = {
  name: string,
  parentCategoryId: number | null,
}
