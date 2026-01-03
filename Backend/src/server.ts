import app from "./app";
import { connectDB } from "./config-db/db";
import { createHardcodedAdmin } from "./seed/Admin";

const PORT = 5000;

const startServer = async () => {
  await connectDB();
  await createHardcodedAdmin(); 

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
startServer();
