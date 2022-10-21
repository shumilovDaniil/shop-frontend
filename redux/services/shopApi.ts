import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AddProductType, IProduct } from "../types"
import { API, baseUrl } from "../../api/endpoints"
import { AddCategoryType, ICategory, ICategoryFeature } from "../../types/categories.types"

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Categories", "Products"],

  endpoints: (builder) => ({
    // category
    getCategories: builder.query<ICategory[], void>({
      query: () => API.getCategoriesTree,
      providesTags: ["Categories"],
    }),

    addCategory: builder.mutation<void, AddCategoryType>({
      query: (category) => ({
        url: API.addCategory,
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Categories"],
    }),

    createCategoryFeature: builder.mutation<void, ICategoryFeature>({
      query: (feature) => ({
        url: API.createCategoryFeature,
        method: "POST",
        body: feature,
      }),
      invalidatesTags: ["Categories"],
    }),

    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `${API.deleteCategory}${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),

    // product
    getProducts: builder.query<IProduct[], void>({
      query: () => API.getProducts,
      providesTags: ["Products"],
    }),

    addProduct: builder.mutation<void, AddProductType>({
      query: (product) => ({
        url: API.addProduct,
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),

    editProduct: builder.mutation<void, IProduct>({
      query: (product) => ({
        url: API.editProduct,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: API.deleteProduct,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,

  useAddCategoryMutation,
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useCreateCategoryFeatureMutation,
} = shopApi

