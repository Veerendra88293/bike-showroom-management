export interface Staff {
  _id: string;
  name: string;
  username: string;
  password: string;        // coming from API 
  role: "Admin" | "Staff";
  isActive: boolean;
  createdAt: string;       // ISO date string
  updatedAt: string;       // ISO date string
  __v?: number;
}
export interface AddStaffPayload {
  name: string;
  username: string;
  password: string;
  role: "staff";
}
