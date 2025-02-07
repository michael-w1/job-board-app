import NavBar from "../components/NavBar";
import { useLocation} from "react-router-dom";
import { format_date } from "../utils/helper";

export default function ViewJob({jobData}) {
    // const location = useLocation();
    // const title : string = location?.state.title || "";
    // const content : string = location?.state.content || "";
    // const company : string  = location?.state.company || "";
    const title = jobData?.title || "";
    const content = jobData?.content || ""; 
    const company = jobData?.company || "";
    const date = jobData?.createdOn || ""; 

    return (

        <div>
            {/* <NavBar userInfo={undefined} onSearchJob={undefined} handleClearSearch={undefined} /> */}
            <div className="pt-6 px-4">
                <div className="card bg-base-100 shadow-xl px-4 py-6">
                    {/* <h2 className="font-bold" > Current Job Postings </h2> */}
                    <h4 className="text-2xl text-gray-800 text-center text-2xl font-bold">
                        {title}
                        </h4>
                        <h4 className = "text-center font-bold">{company}</h4>
                        <h4 className = "text-center font-bold">Date Posted: {format_date(date)}</h4>
                </div>
            </div>
            <div className="w-full items-center justify-center py-6 px-4">
                <div className="w-full">
                    <div className="p-8 rounded-2xl bg-white shadow">

                        <h4 className = "text-center font-bold pb-2"> Description </h4>
                  
                        <pre>{content}</pre>
                   
                        
                    </div>
                </div>
            </div>
        </div>

    )
}