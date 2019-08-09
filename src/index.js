import express from "express"
import ConnectDB from "./config/connectDB"
import ViewEngine from "./config/viewEngine"
import ContactModel from './models/contact.model'
import dotenv from 'dotenv'
import api from './routes/api'
// const express = require('express');
const app = express();

//Connect to MongoDB
ConnectDB();

//View Engine 
ViewEngine(app);

//Call API
api(app);

//Use Environment Variables
dotenv.config();



app.listen(process.env.APP_PORT, process.env.APP_HOSTNAME, () => {
  console.log(`Hello Manh Cuong at : ${process.env.APP_HOSTNAME} : ${process.env.APP_PORT}`);
})