import { Router } from "express";
import extractToken from "../middleware/checkUserWithToken.js";
import {
  assignCollector,
  getAssignedGarbageCollections,
  getHouseholderCollections,
  scheduleWasteCollection,
} from "../controller/scheduleCollection.js";

const router = Router();

router.post("/schedule", extractToken, scheduleWasteCollection);
router.post("/collector/assign", extractToken, assignCollector);
router.get("/collector/assign", extractToken, getAssignedGarbageCollections);
router.get("/schedule", extractToken, getHouseholderCollections);

export default router;
