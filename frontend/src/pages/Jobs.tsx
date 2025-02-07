import NavBar from "../components/NavBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Job, User } from "../types";
import ViewJob from "./ViewJob";
import JobsTable from "./JobsTable";
import { useGetAllJobs } from "../api/JobApi";
import EditJobPost from "./EditJobPost";
import { useGetMyUser } from "../api/UserApi";
import { useAuth0 } from "@auth0/auth0-react";


export default function Jobs() {
    const [isSearch, setIsSearch] = useState(false);
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [allJobsTable, setAllJobsTable] = useState<Job[] | []>([]);
    // const [mode, setMode] = useState("table");
    const [current, setCurrent] = useState(0);
    const [addEditMode, setAddEditMode] = useState("view");
    const navigate = useNavigate();

    const { allJobs, isLoading } = useGetAllJobs();
    const { currentUser } = useGetMyUser();
    // console.log(currentUser); 
    const { isAuthenticated, logout } = useAuth0();
    console.log(allJobs, isLoading, isAuthenticated);

    const message = (m : string) => {
        return (
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-16">
            <div className="max-w-md w-full">
                <div className="p-8 rounded-2xl bg-white shadow">
                    <h1 className="text-2xl text-gray-800 text-center text-2xl font-bold">
                        {m}
                    </h1>
                </div>
            </div>
        </div>)
    }


    const display = (mode: string) => {
        if (mode === "view") {
            return (< div className="columns-2">
                <div className="overflow-auto">
                    <JobsTable allJobs={allJobs} userInfo={currentUser} setCurrent={setCurrent} setAddEditMode={setAddEditMode} />
                </div>
                <div className="overflow-auto">
                    <ViewJob jobData={allJobs ? allJobs[current] : []} />
                </div>
            </div>)

        } else if (mode == "add") {
            return (<EditJobPost jobData={undefined} setAddEditMode={setAddEditMode} />);

        } else {
            return (<EditJobPost jobData={allJobs ? allJobs[current] : undefined} setAddEditMode={setAddEditMode} />);
        }
    }

    return (
        <>

            <NavBar userInfo={userInfo} onSearchJob={undefined} handleClearSearch={undefined} setAddEditMode={setAddEditMode} />
            {isAuthenticated ? 
            (isLoading ? message("loading...") :
                display(addEditMode)) : (message("Please sign up or sign in")) 
            }
        


        </>
    )
}