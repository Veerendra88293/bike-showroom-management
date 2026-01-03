import { api } from "../api/api";

export const customerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<any[], void>({
      query: () => "/customers",
      providesTags: ["Customers", "Dashboard"],
    }),

    addCustomer: builder.mutation({
      query: (data) => ({
        url: "/customers",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Customers", "Dashboard"],
    }),

    deleteCustomer: builder.mutation({
      query: (id: string) => ({
        url: `/customers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customers", "Dashboard"],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useAddCustomerMutation,
  useDeleteCustomerMutation,
} = customerApi;
