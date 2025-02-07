import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Job} from "../types";
import { useAddJob, useEditJob } from "../api/JobApi";


type editJobProps = {
    jobData?: Job;
    setAddEditMode (s: string) : void; 
}

export default function EditJobPost({jobData, setAddEditMode} : editJobProps) {
    const [content, setContent] = useState(jobData? jobData.content : ""); 
    const [title, setTitle] = useState(jobData? jobData.title : "");
    const [company, setCompany] = useState(jobData? jobData.company : ""); 
    const [error, setError] = useState(""); 
    const type = jobData === undefined ? "add" : "edit"; 
    const navigate = useNavigate(); 


    const {addJobMutation} = useAddJob();
    const {editJobMutation} = useEditJob(); 





    const handleAddJob = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
        // console.log("handle add job call");

        if (!title) {
            setError("Please enter the job title");
            return;
        }
        if (!content) {
            setError("Please enter the job description");
            return;
        }

        if (!company){
            setError("Please enter the company name");
            return; 
        }
        // 
        if (type === "edit") {
            await editJobMutation({"title": title, "content" :content, "company" : company, "_id": jobData?._id}); 
            setAddEditMode("view"); 

        } else {
            await addJobMutation({"title": title, "content" :content, "company" : company}); 
            setAddEditMode("view"); 
        }
    };


    return (

        <div>
            {/* <NavBar userInfo={undefined} onSearchJob={undefined} handleClearSearch={undefined} setAddEditMode={undefined} /> */}
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-16">
                <div className="max-w-md w-full">
                    <div className="p-8 rounded-2xl bg-white shadow">
                        <h4 className="text-2xl text-gray-800 text-center text-2xl font-bold">
                            {type === "edit" ? "Edit Job Post" : "Add New Job Post"}
                        </h4>
                        <form onSubmit={handleAddJob} className="mt-8 space-y-4">
                            <input
                                type="text"
                                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                placeholder="Job Title"
                                value={title}
                                onChange={({ target }) => setTitle(target.value)}
                            />



                            <textarea
                                // type="text"
                                className="textarea textarea-bordered w-full outline-blue-600"
                                placeholder="Job Description"
                                rows={10}
                                value={content}
                                onChange={({ target }) => setContent(target.value)}
                            />

                            <input
                                type="text"
                                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                placeholder="Company"
                                value={company}
                                onChange={({ target }) => setCompany(target.value)}
                            />
                            {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
                            <button
                                type="submit"
                                className="btn btn-neutral w-full"
                            // onClick={handleAddJob}
                            >
                                {type === "edit" ? "Update Job Post" : "Add Post"}
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}