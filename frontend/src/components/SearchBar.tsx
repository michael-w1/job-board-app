import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

export default function SearchBar({value, onChange, handleSearch, onClearSearch}){
    return(
        <div className="w-80 flex items-center px-4 bg-gray-100 rounded-md">
            <input
                type="text"
                placeholder="Search Jobs"
                className="w-full text-xs bg-transparent py-[12px] outline-none"
                value={value}
                onChange={onChange}
            />
            {value &&  <IoMdClose className="" onClick={onClearSearch} /> 
            }
           
            <FaMagnifyingGlass className="text-slate-500 cursor-pointer hover:text-black"
            onClick={handleSearch}/>

        </div>
    )
};
