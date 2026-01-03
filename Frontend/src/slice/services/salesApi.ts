import { api } from "../api/api";

export const salesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSales: builder.query<any[], void>({
      query: () => "/sales",
      providesTags: ["Sales"],
    }),
    createSales: builder.mutation({
      query: (data) => ({
        url: "/sales",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sales", "Bikes", "Dashboard"],
    }),
  }),
});
export const { useGetSalesQuery, useCreateSalesMutation } = salesApi;
