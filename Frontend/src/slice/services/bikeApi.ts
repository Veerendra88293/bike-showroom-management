import { api } from "../api/api";

export const bikeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBikes: builder.query<any[], void>({
      query: () => "/bikes",
      providesTags: ["Bikes", "Dashboard"],
    }),

    addBike: builder.mutation({
      query: (data) => ({
        url: "/bikes",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bikes", "Dashboard"],
    }),

    updateBike: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/bikes/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Bikes", "Dashboard"],
    }),

    deleteBike: builder.mutation({
      query: (id: string) => ({
        url: `/bikes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bikes", "Dashboard"],
    }),
  }),
});

export const {
  useGetBikesQuery,
  useAddBikeMutation,
  useUpdateBikeMutation,
  useDeleteBikeMutation,
} = bikeApi;
