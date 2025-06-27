import e, { Request, Response } from "express";
import { prisma } from "../config/prisma";



export const getData = async (req: Request, res: Response)=>{
   try{ 
      const filterData :any = {};
      if(req.query.categoryId) {
         filterData.categoryId = parseInt(req.query.categoryId as string);
      }


      const expenses = await prisma.expense.findMany({
         where: filterData,

         include: {
            categories:{
               select: {
                  id: true,
                 category_name: true,
                  
               }
            }
        }
      });

      res.status(200).send(expenses);
   }catch(error:any) {
    console.log(error);
    res.status(error.rc || 500).send(error);
   }
};
export const getById = async (req: Request, res: Response) => {
  try {
  
   } catch (error: any){
      console.log(error);
      res.status(error.rc || 500).send(error)
   }
};
export const addData = async(req: Request, res: Response)=>{
  try{
   const{title, nominal, date, categoryId} = req.body;

   const expense = await prisma.expense.create({
      data: {
         title,
         nominal,
         date: new Date(date),
         categoryId
      }
   });
   res.status(201).send({
      success: true,
      message : "Add data success",
   });
  } catch(error: any) {
      console.log(error);
      res.status(error.rc || 500).send(error)
      }
};
export const updateData = async (req: Request, res: Response) => {
  try {
      
} catch (error: any) {
   console.log(error);
   res.status(error.rc || 500).send(error);
}
};

export const deleteData = async (req: Request, res: Response) => {
  try {
      
} catch (error: any) {
   console.log(error);
   res.status(error.rc || 500).send(error);
}
};
     
     
export const getByCategory = (req:Request, res:Response)=> {
       
};
export const getByDate = (req:Request, res: Response)=> {
   
};

    
