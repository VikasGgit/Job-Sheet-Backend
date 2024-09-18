import express from 'express'
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
import connectdb from './connectdb.js';
import jobsheetRoutes from './services.js'
import cors from 'cors'
connectdb();

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/jobsheets', jobsheetRoutes);

app.get('/', (req, res) => {
    res.json({"msg":"Welcome to the world!"});
})

app.listen(PORT, ()=>{
    console.log('listening on port', PORT);
})
    