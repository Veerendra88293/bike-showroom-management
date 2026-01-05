export interface Customer {
  _id: string;
  name: string;
  phone: string;
  address: string;
  purchasedBike: string;
  staffId?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
export type AddCustomerPayload = {
  name: string;
  phone: string;
  address?: string;
  purchasedBike: string;
};