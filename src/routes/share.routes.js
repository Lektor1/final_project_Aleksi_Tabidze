import express from "express";
import ShareController from "../controllers/share.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
const shareController = new ShareController();

router.get(
  "/share",
  authMiddleware,
  shareController.generateShareLink.bind(shareController)
);
router.get(
  "/download/:token",
  shareController.downloadFile.bind(shareController)
);

export default router;
