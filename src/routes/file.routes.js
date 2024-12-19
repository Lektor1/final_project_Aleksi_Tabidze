import express from "express";
import FileController from "../controllers/file.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
const fileController = new FileController();

router.post(
  "/space/upload",
  authMiddleware,
  fileController.uploadFile.bind(fileController)
);
router.post(
  "/space/meta",
  authMiddleware,
  fileController.attachMeta.bind(fileController)
);
router.get(
  "/space/meta",
  authMiddleware,
  fileController.getMeta.bind(fileController)
);

export default router;
