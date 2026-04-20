import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path from "path";
import donorRouter from "./routes/donorRoutes.js";
import Recipientrouter from "./routes/recipientRoutes.js";
import Adminrouter from "./routes/adminRoutes.js";
import bloodRequestrouter from "./routes/bloodRequestRoutes.js";




const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));



app.use("/api/donors",donorRouter);
app.use("/api/recipients",Recipientrouter);
app.use("/api/admin", Adminrouter);

app.use("/api/requests", bloodRequestrouter);

dotenv.config();
const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;
// console.log(" DB link is here",process.env.MONGOURL)
mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected Successfully");
    app.listen(PORT, () => {
      console.log(`Server is runniing on Port:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
