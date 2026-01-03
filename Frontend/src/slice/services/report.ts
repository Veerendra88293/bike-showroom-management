import { api } from "../api/api";

export const reportApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getReportStats: builder.query<any, void>({
      query: () => "/reports",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetReportStatsQuery } = reportApi;
