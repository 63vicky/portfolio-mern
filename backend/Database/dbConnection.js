import mongoose from 'mongoose';

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: 'PORTFOLIO-MERN',
    })
    .then(() => {
      console.log('Connected to the database');
    })
    .catch((error) => {
      console.log('Database connection error:', error);
    });
};
export default dbConnection;
