import express from "express"; 
import jobController from "../controllers/JobController";
import { jwtParse, jwtCheck } from "../middleware/auth";
import { validateJobRequest } from "../middleware/validation";

const router = express.Router(); 

// router.get("/", jwtCheck, jwtParse, userController.getCurrentUser);

// // Checking that the jwt token is valid before creating the user in the db 
// router.post("/", jwtCheck, userController.createCurrentUser);



router.get("/", jwtCheck, jwtParse, jobController.getAllJobs); 
router.post("/", jwtCheck, jwtParse, validateJobRequest, jobController.addJob); 
router.delete("/", jwtCheck, jwtParse, jobController.deleteJob);
router.put("/", jwtCheck, jwtParse, validateJobRequest, jobController.editJob);


export default router; 

