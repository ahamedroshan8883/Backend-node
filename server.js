const express = require('express');
const cors = require('cors');
const connectionDB = require('./util/database');
const userRouters = require('./Routers/UserRoutes');
const ShippingRouter = require('./Routers/ShippingDetRoutes');
const cartRotuer = require('./Routers/CartRouter');
const app = express();
require('dotenv').config();

const allowedOrigins = ['http://localhost:3000', 'https://ahamedroshan8883.github.io'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    // Check if the request's origin is in the allowedOrigins array
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (cookies, authorization headers)
}));
app.use(express.json());

const start = async()=>{
    try{
        await connectionDB(process.env.MONGO_LOCAL_URL);
        console.log('connected');
        app.listen(8081,()=>{
            console.log('server is running on 8081');
        });
    }catch(error){
        console.log(error);
    }
}
start();
app.use('/ARA',userRouters);
app.use('/ARA',ShippingRouter);
app.use('/ARA',cartRotuer);