import User from "../models/User";



export const createHardcodedAdmin = async () => {
  const adminUsername = "admin";

  const existingAdmin = await User.findOne({
    username: adminUsername,
    role: "Admin",
  });

  if (existingAdmin) {
    console.log("Admin already exists");
    return;
  }

  await User.create({
      name: "Admin",
      username: "admin",
      password: "admin123",
      role: "Admin",
      isActive: true,
    });

  console.log("Hardcoded admin created");
};
