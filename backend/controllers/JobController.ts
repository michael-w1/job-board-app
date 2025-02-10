
import { Request, Response } from 'express';
import Job from "../models/job.model";

// What do we need to find all jobs 
// what the current user id is ... 
const getAllJobs = async (req: Request, res: Response) => {
    try {
        if(!req.userId) res.status(500).json({message: "Error in adding new job"}); 

        const jobs = await Job.find(
            {$or: [
                { userId: req.userId},  // Jobs created by the current user
                // { userId: process.env.ADMIN_ID }  
            ]}).sort({ createdOn: 1 });

        // console.log("job", jobs); 
        res.send(jobs); 

    } catch (error) {
        res.status(500).json({message : "Error in getting jobs"}); 
    }
};

const addJob = async (req: Request, res: Response) => {
    try {
        const { title, content, company } = req.body;
        if(!req.userId) res.status(500).json({message: "Error in adding new job"}); 

        const job = new Job({
            title,
            content,
            company,
            userId: req.userId,
        });

        await job.save();

        // console.log("new job added", job); 
        res.status(201).json(job.toObject()); 
        }catch (error) {
        res.status(500).json({message: "Error in creating new user"}); 

    }
};


// // HTTP PUT Request for editing Jobs
// app.put("/edit-job/:jobId", authenticateToken, async (req: Request, res: Response) => {

const editJob = async (req: Request, res: Response) =>{
    const { title, content, company, _id : jobId} = req.body;
    // const { user } = req.body.user;
    // const { user } = req.user || {};
    // Have to check this 

    // console.log("edit job body", title, content, company, jobId); 

    if (!title && !content && !company) res.status(400).json({ error: true, message: "No changes to job" });
    if (!req.userId || jobId) res.status(500).json({message: "Error in editing job"}); 

    try {
        const job = await Job.findOne({ _id: jobId, userId: req.userId });
        if (!job) return res.status(400).json({ error: true, message: "Job not found" });

        if (title) job.title = title;
        if (content) job.content = content;
        if (company) job.company = company;
   
        await job.save();
        return res.json(job.toObject()); 

    } catch (error) {
        res.status(500).json({ message: "Error in editing job" });
    }

};



// // Removing the job
// app.delete("/delete-job/:jobId", authenticateToken, async (req: Request, res: Response) => {

const deleteJob = async (req: Request, res: Response) =>{
    // const jobId = req.params.jobId;
    // const { user } = req.user || {};
    const { _id : jobId} = req.body;
    if (!req.userId || !jobId) res.status(500).json({message: "Error in editing job"}); 

    try {
        const job = await Job.findOne({ _id: jobId, userId: req.userId });
        if (!job) return res.status(400).json({ error: true, message: "Job not found" });

        await Job.deleteOne({ _id: jobId, userId: req.userId });
        res.json({
            error: false,
            message: "Job deleted"
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });

    }


};



// // Search Jobs
// app.get("/search-jobs/", authenticateToken, async (req: Request, res: Response) => {
const searchJob = async (req: Request, res: Response) =>{
    // const { user } = req.user || {};
    const { query } = req.body; 
    if (!req.userId) res.status(500).json({message: "Error in searching job"}); 

    if (!query) {
        return res.status(400).json({
            error: true,
            message: "Search Query is required"
        });
    }
    
    try {
        const matchingJobs = await Job.find({
            $or: [
                { title: { $regex: new RegExp(query, "i") } },
                { content: { $regex: new RegExp(query, "i") } },
            ],

        });

        return res.json({
            error: false, 
            jobs: matchingJobs, 
            message: "Found jobs matching search", 
        }); 

    } catch (error) {
        res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }



};


export default {
    getAllJobs,
    addJob,
    editJob,
    deleteJob,
    searchJob
}