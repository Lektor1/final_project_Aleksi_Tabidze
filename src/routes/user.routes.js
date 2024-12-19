import express from "express";
import UserController from "../controllers/user.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
const userController = new UserController();

router.post("/create", userController.createUser.bind(userController));
router.post("/validate", userController.validateUser.bind(userController));
router.post("/login", userController.loginUser.bind(userController));
router.post(
  "/unregister",
  authMiddleware,
  userController.unregisterUser.bind(userController)
);

export default router;
