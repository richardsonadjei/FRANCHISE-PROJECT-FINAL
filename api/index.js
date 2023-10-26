import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cocoaBagRouter from './routes/cocoabag.route.js'; // Import the cocoaBagRouter
import supplierRouter from './routes/supplier.route.js';
import customerRouter from './routes/customer.route.js';
import evacuationRouter from './routes/evacuation.route.js';
import expenseCategoryRouter from './routes/expenseCategory.route.js';
import expenseRouter from './routes/expense.route.js';


import cookieParser from 'cookie-parser';
import incomeRouter from './routes/income.route.js';
import waybillRouter from './routes/waybill.route.js';



dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/cocoabags', cocoaBagRouter); // Mount the cocoaBagRouter at the '/api/cocoabags' endpoint
app.use('/api/supplier', supplierRouter);
app.use('/api/customer', customerRouter);
app.use('/api/evacuation', evacuationRouter);
app.use('/api/income', incomeRouter);
app.use('/api/waybill', waybillRouter); 
app.use('/api', expenseCategoryRouter);
app.use('/api/expenses', expenseRouter);



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
