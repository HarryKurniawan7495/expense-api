import { Request, Response, NextFunction } from "express";
import { IExpense } from "../types/expense.types";
import poolDB from "../config/db";
import { RequestHandler } from "express";
import { Result } from "pg";


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
   "insert into expense (title, nominal, category, type, date) values ($1, $2, $3, $4, $5) ";
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
          `update expense set title = $1, nominal = $2, category = $3, type= $4, date= $5 where id = $6 RETURNING *;`;
            const data = await poolDB.query(sqlScript, [
               ...Object.values(req.body),
               req.params.id,
            ]);
 res.status(200).send({
      success: true,
      message: "Pembaharuan data berhasil",
   data: data.rows[0],
 });
} catch (error: any) {
   console.log(error);
   res.status(error.rc || 500).send(error);
}
};

export const deleteData = async (req: Request, res: Response) => {
  try {
      const sqlScript: string =
          `delete from expense where id = $1 ;`;
          await poolDB.query(sqlScript, [ req.params.id]);
 res.status(200).send({
      success: true,
      message: "Hapus data berhasil",
});
} catch (error: any) {
   console.log(error);
   res.status(error.rc || 500).send(error);
}
};
     
     
export const getByCategory = (req:Request, res:Response)=> {
       
};
export const getByDate = (req:Request, res: Response)=> {
   
};

    
