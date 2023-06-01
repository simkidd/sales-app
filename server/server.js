import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db";
import productRoutes from './routes/productRoutes'
import authRoutes from "./routes/authRoutes"
import userRoutes from "./routes/userRoutes"
import profileRoute from "./routes/profileRoute"
import cartRoutes from "./routes/cartRoutes"
import { errorHandler, notFound } from "./middleware/errorHandler";

dotenv.config();

// create express app
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// custom routes
app.use('/api', productRoutes)
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', profileRoute)
app.use('/api', cartRoutes)

// error handler
app.use(notFound)
app.use(errorHandler)

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
