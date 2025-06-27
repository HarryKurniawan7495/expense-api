import dotenv from "dotenv";
dotenv.config();
import express, {Application, Request, Response} from "express";
//import routers
import expenseRouter from "./routers/expense.router"
import poolDB from "./config/db";
import cors from "cors";

const PORT:string | number = process.env.PORT || 2500

const app:Application = express();

//define main middleware
app.use(express.json());

//define router
app.get("/", (req: Request, res: Response)=>{
    res.status(200).send("<h1>Welcome to Espense API</h1>")
})

app.use("/expense", expenseRouter);

//check DB connection
poolDB.connect((err, client, release)=>{
    if(err) {
        return console.log("Error connection", err.message);
    }
    console.log("Success Connection");
    release();
})

app.listen(PORT,()=>{
    console.log("EXPENSE API is RUNNNING", PORT);
})