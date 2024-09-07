import userRoutes from './module/User/routes/userRoutes.js'
import clientRoutes from './module/Dashboard/Client/routes/clientRoutes.js';


const registerRoutes = (app) => {
    // Register your routes here
    app.use('/api/users', userRoutes);
    app.use('/api/clients', clientRoutes);
  
    // Add any other routes similarly
  };
  
  export default registerRoutes;