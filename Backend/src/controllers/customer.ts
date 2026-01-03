import { Request, Response } from "express";
import Customer from "../models/Customer";


//Add Customer
export const addCustomer = async (req: Request, res: Response) => {
  try {
    const { name, phone, address, bike } = req.body;
    const customerExists = await Customer.findOne({phone});
    if (customerExists) {
      return res.status(400).json({ message: "Customer with this phone number already exists" });
    }
const customer = await Customer.create({
  name,
  phone,
  address,
  purchasedBike: bike,
  staffId: req.user?.id,
});

    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Failed to add customer" });
  }
};

//Get All Customers
export const getCustomers = async (_req: Request, res: Response) => {
  try {
  if (_req.user && _req.user.role === "Admin") {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } else if (_req.user) {
    const customers = await Customer.find({ staffId: _req.user.id }).sort({
      createdAt: -1,
    });
    res.json(customers);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
} catch (e) {
  console.error(e);
  res.status(500).json({ message: "Failed to fetch customers" });
}

};

// Delete Customer
export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: "Customer deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete customer" });
  }
};
