import type { Staff } from "../../types/staffType";
import { api } from "../api/api";

export const employeeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all staff
    getStaff: builder.query<Staff[], void>({
      query: () => "/employees",
      providesTags: ["Staff", "Dashboard"],
    }),

    // Add staff
    addStaff: builder.mutation({
      query: (data) => ({
        url: "/employees",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Staff", "Dashboard"],
    }),

    // Delete staff
    deleteStaff: builder.mutation({
      query: (id: string) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Staff", "Dashboard"],
    }),

    // Toggle staff status
    toggleStaffStatus: builder.mutation({
      query: (id: string) => ({
        url: `/employees/${id}/status`,
        method: "PATCH",
      }),
      invalidatesTags: ["Staff", "Dashboard"],
    }),
  }),
});

export const {
  useGetStaffQuery,
  useAddStaffMutation,
  useDeleteStaffMutation,
  useToggleStaffStatusMutation,
} = employeeApi;
