import { Router } from "express";
import { addData, getByCategory, getData, getByDate, getById, updateData, deleteData, } from "../controllers/expense.controller";

const router: Router = Router();

router.get("/", getData);
router.get("/:id", getById);
router.patch("/:id", updateData); // Assuming you want to use updateData for patch requests
// Note: If you want to use the same function for both POST and PUT, you can  
// use the same function for both routes, but it's generally better to have distinct functions for clarity.
// If you want to use the same function for both POST and PUT, you can do so    
router.delete("/:id", deleteData); // Assuming you want to use deleteData for delete requests
router.post("/", addData);
router.put("/:id", addData); // Assuming you want to use the same addData for update

router.get("/byCategory/:category", getByCategory)
router.get("/byDate/:startDate/:endDate", getByDate)

export default router;