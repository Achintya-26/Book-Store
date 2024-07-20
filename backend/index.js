import express from 'express';
import {PORT, mongoDBURL} from './config.js'
import mongoose, { mongo } from 'mongoose';
import booksRoute from './routes/bookRoutes.js';
import cors from 'cors';

const app=express();
app.use(cors());
// app.use(cors({
//     origin:'https://localhost:3000',
//     methods:['GET','POST','DELETE','PUT'],
//     allowedHeaders:['Content-Type']
// }));

// Middleware for parsing JSON
app.use(express.json());

app.use('/books',booksRoute);
app.get('/home',(req,res)=>{
    res.send("Welcome to the Home Page!");
})



mongoose.connect(mongoDBURL)
.then(()=>{
    console.log('App connected to database!');
    app.listen(PORT,()=>{
        console.log(`Listening on port ${PORT}`);
    })
    
})
.catch(err=>{
    console.log(err);
})


