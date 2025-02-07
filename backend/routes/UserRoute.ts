import express from "express"; 
import userController from "../controllers/UserController";
import { jwtParse, jwtCheck } from "../middleware/auth";


const router = express.Router(); 

router.get("/", jwtCheck, jwtParse, userController.getCurrentUser);

// Checking that the jwt token is valid before creating the user in the db 
router.post("/", jwtCheck, userController.createCurrentUser);

export default router; 

