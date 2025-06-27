import { Request, Response, NextFunction } from "express";
import { IExpense } from "../types/expense.types";
import poolDB from "../config/db";
import { RequestHandler } from "express";


export const getData = async (req: Request, res: Response)=>{
   try{

      const sqlScript:string = 
      "select * from expense ;";
      const data = await poolDB.query(sqlScript);
      console.log(data);
   
      res.status(200).send(data.rows);
   }catch(error) {
    console.log(error);
   }
}
export const getById: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const sqlScript = "select * from expense where id = $1;";
    const data = await poolDB.query(sqlScript, [id]);

    if (!data.rowCount){
      throw {rc:404, msg: "Expense not found"};
    }
    res.status(200).send(data.rows[0]);
   } catch (error: any){
      console.log(error);
      res.status(error.rc || 500).send(error)
   }
}; 
export const addData = async(req: Request, res: Response)=>{
  try{
   const sqlScript:string =
   "insert into expense (title, nominal, date, category, type) values ($1, $2, $3, $4, $5) ";
   const data = await poolDB.query(sqlScript, Object.values(req.body));

   res.status(201).send({
      success: true,
      message: "Tambahan data berhasil",
  });
}
   catch(error: any) {
      console.log(error);
      res.status(error.rc || 500).send(error)
      }
};
export const updateData = async (req: Request, res: Response) => {
  try {
      const sqlScript: string =
          `update expense set title = $1, nominal = $2, date = $3, category = $4, type = $5 where id = $6" RETUNING *:`;
            const data = await poolDB.query(sqlScript, [
               ...Object.values(req.body),
               req.params.id,
            ]);
         } catch (error: any) {
      console.log(error);
      res.status(error.rc || 500).send(error);
  }
};

export const getByCategory = (req:Request, res:Response)=> {
       
};
export const getByDate = (req:Request, res: Response)=> {
   
};

    
