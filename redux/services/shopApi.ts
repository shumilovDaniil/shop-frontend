import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ICategory, IFeature, IProduct } from "../types"

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://shopyshop.somee.com/" }),
  tagTypes: ["Categories", "Products"],

  endpoints: (builder) => ({
    // product
    getProducts: builder.query<IProduct[], void>({
      query: () => "Shop/GetProducts",
      providesTags: ["Products"],
    }),
    editProduct: builder.mutation<void, IProduct>({
      query: (product) => ({
        url: `AdminPanel/EditProduct`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `AdminPanel/DeleteProduct/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),


    // category
    getCategories: builder.query<ICategory[], void>({
      query: () => "Shop/GetCategories",
      providesTags: ["Categories"],
    }),
    createCategoryFeature: builder.mutation<void, IFeature>({
      query: (feature) => ({
        url: "AdminPanel/CreateCategoryFeatures",
        method: "POST",
        body: feature,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `AdminPanel/DeleteCategory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useEditProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useCreateCategoryFeatureMutation,
} = shopApi

