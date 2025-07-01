import express from "express"
import { getMessage, sendMessage } from "../controllers/message.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.middlewares.js";

const router = express.Router();

router.route("/send/:id").post(isAuthenticated,sendMessage);
router.route("/:id").get(isAuthenticated,getMessage)

export default router;