import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export type NotificationType = "SALE" | "LOW_STOCK";

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  time: string;
}

interface NotificationState {
  list: Notification[];
}

const initialState: NotificationState = {
  list: JSON.parse(localStorage.getItem("notifications") || "[]"),
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<Notification>) {
      state.list.unshift(action.payload);
      localStorage.setItem("notifications", JSON.stringify(state.list));
    },
    removeNotification(state, action: PayloadAction<string>) {
      state.list = state.list.filter((n) => n.id !== action.payload);
      localStorage.setItem("notifications", JSON.stringify(state.list));
    },
    clearNotifications(state) {
      state.list = [];
      localStorage.setItem("notifications", "[]");
    },
  },
});

export const { addNotification, removeNotification, clearNotifications } =
  notificationSlice.actions;

export default notificationSlice;
