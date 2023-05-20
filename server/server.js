import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db";
import itemRoutes from "./routes/itemRoutes";
import authRoutes from "./routes/authRoutes"
import userRoutes from "./routes/userRoutes"
import profileRoute from "./routes/profileRoute"

dotenv.config();

// create express app
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// custom routes
app.use('/api', itemRoutes)
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', profileRoute)

// home route
app.get('/', (req, res) => {
    res.json('backend running...')
})

// server function
const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
startServer();
