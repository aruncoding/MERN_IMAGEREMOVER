import dotenv from 'dotenv'
dotenv.config() // Make availble all variable created on .env file to access to this page
import express from 'express'
import cors from 'cors'
import connection from './config/connectDb.js';
import userRoutes from './module/user/routes/userRoutes.js'
import db from './models/index.js'
import bodyParser from 'body-parser';
import registerRoutes from './registerRoutes.js';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import path, { dirname, join } from 'path'; 

const app = express()
const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3001', // Replace this with your frontend origin
  credentials: true,               // Allow credentials (cookies)
}));

// Use routes
// app.use('/api', userRoutes);
registerRoutes(app);

// Sync Sequelize models
// db.sequelize.sync()
//   .then(() => {
//     console.log("Synced db success...");
//   })
//   .catch((err) => {
//     console.log("Failed to sync db...: " + err.message);
//   });
  /* to alter any table run below sync */
  // db.sequelize.sync({alter : true})
  //   .then(() => {
  //     console.log("Synced db success...");
  //   }).catch((err) => {
  //     console.log("Failed to sync db...", err.message)
  //   });

// File URL setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the uploads directory
const uploadsDir = join(__dirname, 'uploads'); // Define the path to the uploads directory
console.log("Serving static files from:", uploadsDir);

app.use('/uploads', express.static(uploadsDir));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});