import express, { Request, Response } from 'express';
import { DatabaseConnection } from './config/database';
import adminRoutes from './routes/admin.routes';
import userRoutes from './routes/user.routes';

const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Server is up and running' });
});

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

// Initialize database connection
DatabaseConnection.initialize()
  .then(() => {
    console.log('Database connection established');
    // Start server after database connection is established
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.log('TypeORM connection error: ', error)); 