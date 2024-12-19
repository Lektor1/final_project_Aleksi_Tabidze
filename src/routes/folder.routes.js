import express from "express";
import FolderController from "../controllers/folder.controller.js";

const router = express.Router();
const folderController = new FolderController();

router.get("/space", folderController.listUserSpace.bind(folderController));
router.put(
  "/space/create",
  folderController.createUserSpace.bind(folderController)
);
router.delete(
  "/space/file",
  folderController.deleteUserFile.bind(folderController)
);

export default router;
