import dotenv from 'dotenv'
dotenv.config() // Make availble all variable created on .env file to access to this page
import express from 'express'
import cors from 'cors'
import connection from './config/connectDb.js';
import userRoutes from './module/User/routes/userRoutes.js'
import db from './models/index.js'
import bodyParser from 'body-parser';
import registerRoutes from './registerRoutes.js';

const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Use routes
// app.use('/api', userRoutes);
registerRoutes(app);

// Sync Sequelize models
db.sequelize.sync()
  .then(() => {
    console.log("Synced db success...");
  })
  .catch((err) => {
    console.log("Failed to sync db...: " + err.message);
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});