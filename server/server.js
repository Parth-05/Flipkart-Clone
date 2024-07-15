import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import bodyParser from "body-parser";

import Connection from "./database/db.js";
import DefaultData from "./default.js";

// routes
import Router from "./routes/route.js";

const app = express();

dotenv.config();

// Configure CORS
const corsOptions = {
    origin: 'https://flipkart-clone-kappa-eight.vercel.app',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);

const PORT = process.env.PORT || 8000;


const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const URL = process.env.MOGODB_URI

// Connection(URL);

// app.listen(PORT, () => {
//     console.log(`Server is running successfully on PORT: ${PORT}`);
// });

// DefaultData();

Connection(URL).then(() => {
    // console.log('Database connected successfully');
    app.listen(PORT, () => {
        console.log(`Server is running successfully on PORT: ${PORT}`);
        // DefaultData();
    });
}).catch((error) => {
    console.log(`Error connecting to database: ${error.message}`);
});