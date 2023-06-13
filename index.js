const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
app.use(cors({
  // origin: ["http://localhost:3000", "http://localhost:8080"]
  origin: ['https://quint-essentials-store.vercel.app',"https://www.quint-essentials-store.vercel.app" ,"https://quint-essentials-admin.vercel.app", "https://www.quint-essentials-admin.vercel.app", "https://www.quintessentials.in", "http://localhost:8080", "http://localhost:3000"]
}));
const helmet = require('helmet');



const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userOrderRoutes = require('./routes/userOrderRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const couponRoutes = require('./routes/couponRoutes');
const { isAuth, isAdmin } = require('./config/auth');

connectDB();

// We are using this for the express-rate-limit middleware
// See: https://github.com/nfriedly/express-rate-limit
// app.enable('trust proxy');

app.set('trust proxy', 1);
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ message: err.message });
});
app.use(express.json());
app.use(helmet());

//root route
app.get('/', (req, res) => {
  res.send('App works properly!');
});

//this for route will need for store front, also for admin dashboard
app.use('/api/products/', productRoutes);
app.use('/api/category/', categoryRoutes);
app.use('/api/coupon/', couponRoutes);
app.use('/api/user/', userRoutes);
app.use('/api/order/', isAuth, userOrderRoutes);

//if you not use admin dashboard then these two route will not needed.
app.use('/api/admin/', adminRoutes);
app.use('/api/orders/', orderRoutes);

// Use express's default error handling middleware

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`server running on port ${PORT}`));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
