const express = require('express');
const cors = require('cors');
const connectionDB = require('./util/database');
const userRouters = require('./Routers/UserRoutes');
const ShippingRouter = require('./Routers/ShippingDetRoutes')
const app = express();
require('dotenv').config();

app.use(cors());
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
app.use('/ARA',ShippingRouter)