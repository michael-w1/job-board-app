import { useDeleteJob, useGetAllJobs } from "../api/JobApi";
import JobRow from "../components/JobRow";
import { Job } from "../types";
import { useEffect, useState, MouseEvent } from "react";

export default function JobsTable({allJobs, setCurrent, userInfo, setAddEditMode}){
        const createTableHeader = () => {
            // List of headers, order will not change - using key as index 
            const header = ["", "Job Title", "Company", "Date", "Description"]
            return header.map((heading, index) => <th key={index} className="text-black"> {heading}</th>)
        };


        // let {allJobs, isPending} = useGetAllJobs(); 
        // // if(!allJobs){
        // //     allJobs = []; 
        // // }
        
        // console.log(allJobs, isPending); 
        const {deleteJobMutation} = useDeleteJob(); 

    return (
        <>
            <div className="pt-6 px-8">
                <div className="card bg-base-100 shadow-xl px-8 py-6">
                    <h2 className="font-bold" > Current Job Postings </h2>
                </div>
            </div>
            <div className="px-8 pt-8 pb-64">
                <div className="overflow-x-auto bg-white border rounded-xl">
                    <table className="table">
                        <thead>
                            <tr>
                                {createTableHeader()}
                            </tr>
                        </thead>
                        {(allJobs || [])?.length > 0 && (
                            <tbody>

                                {allJobs?.map((job: Job, index : number) => (

                                    <tr key={job._id} className="hover:bg-gray-100"
                                        onClick={() => {
                                            // setMode("view");
                                            setCurrent(index);
                                        }}
                                    // onClick={() => navigate("/viewjob", { state: job })}
                                    >
                                        <JobRow
                                            // key={job._id}
                                            title={job.title}
                                            date={job.createdOn || ""}
                                            content={job.content}
                                            company={job.company}
                                            onEdit={(e: MouseEvent) => {
                                                if (e.stopPropagation) e.stopPropagation();
                                                setCurrent(index);
                                                setAddEditMode("edit"); 
                                            }}
                                            onDelete={async (e: MouseEvent) => {
                                                if (e.stopPropagation) e.stopPropagation();
                                                await deleteJobMutation(job);
                                            }}
                                            tableIndex={index + 1}
                                            jobPoster={job.userId || ""}
                                            currentUser={userInfo?._id || ""}

                                        />
                                    </tr>
                                ))}

                            </tbody>
                        )
                        }
                    </table>
                </div>
            </div>
        </>
    )
}