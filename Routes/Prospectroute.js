import express from "express";
import {
  addProspect,
  getProspects,
  updateProspectStatus,
  addProspectsFromCommaInput
} from "./Controllers.js";

const router = express.Router();

router.post("/", addProspect);               // Add prospect
router.get("/", getProspects);               // List prospects
router.patch("/:id/status", updateProspectStatus); // Update status
router.post("/populate",addProspectsFromCommaInput)
export default router;
