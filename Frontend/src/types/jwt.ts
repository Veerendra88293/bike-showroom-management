export type JwtPayload = {
  id: string;
  role: "Admin" | "Staff";
  exp: number;
};