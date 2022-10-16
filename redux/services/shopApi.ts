import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { addCategoryType, addProductType, ICategory, IFeature, IProduct } from "../types"

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://shopyshop.somee.com/" }),
  tagTypes: ["Categories", "Products"],

  endpoints: (builder) => ({
    // category
    getCategories: builder.query<ICategory[], void>({
      query: () => "Shop/GetCategories",
      providesTags: ["Categories"],
    }),

    addCategory: builder.mutation<void, addCategoryType>({
      query: (category) => ({
        url: `AdminPanel/CreateCategory`,
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Categories"],
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

    // product
    getProducts: builder.query<IProduct[], void>({
      query: () => "Shop/GetProducts",
      providesTags: ["Products"],
    }),

    addProduct: builder.mutation<void, addProductType>({
      query: (product) => ({
        url: `AdminPanel/CreateProduct`,
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
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

