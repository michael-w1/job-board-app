
import { JobRowProps } from "../types";
import { format_date } from "../utils/helper";
export default function JobRow({
    title, date, content, company, onEdit, onDelete, tableIndex, jobPoster, currentUser } : JobRowProps) {
    // console.log(jobPoster, currentUser); 
    return (



        <>
            <th>{tableIndex}</th>
            <td>{title}</td>
            <td>{company}</td>
            <td>{format_date(date)}</td>
            <td>{content?.slice(0, 60) + "..."}</td>
            {jobPoster === currentUser &&
                <td><button className="btn btn-square" onClick={onEdit}>Edit </button> </td>}
            {jobPoster === currentUser &&
                <td><button className="btn btn-square" onClick={onDelete}> X </button> </td>}
        </>
    )

}