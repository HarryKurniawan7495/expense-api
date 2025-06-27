import { Router } from "express";
import { addData, getByCategory, getData, getByDate, getById, } from "../controllers/expense.controller";

const router: Router = Router();

router.get("/", getData);
router.get("/:id", getById);
router.post("/", addData);
router.put("/:id", addData); // Assuming you want to use the same addData for update
router.get("/byCategory/:category", getByCategory)
router.get("/byDate/:startDate/:endDate", getByDate)

export default router;