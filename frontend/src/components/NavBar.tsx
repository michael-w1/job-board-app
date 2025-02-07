import { useNavigate } from "react-router-dom";
import UserInfo from "./UserInfo";
import SearchBar from "./SearchBar";
import { ChangeEvent, useState } from "react";
// import { NavBarProps } from "../types";

export default function NarBar({ userInfo, onSearchJob, handleClearSearch, setAddEditMode }) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    // const { loginWithRedirect, isAuthenticated } = useAuth0();

    const onLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const handleSearch = () => {
        if (searchQuery) {
            onSearchJob(searchQuery);
        }

    };

    const onClearSearch = () => {
        setSearchQuery("");
        handleClearSearch();
    };

    // console.log("nav bar", userInfo); 
    return (
        <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow-md">
            <h1 className="text-xl font-bold text-black py-2">
                Job Board
            </h1>
            {userInfo &&
                <SearchBar
                    value={searchQuery}
                    onChange={( e : ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    handleSearch={handleSearch}
                    onClearSearch={onClearSearch}
                />}

            <UserInfo userInfo={userInfo} onLogout={onLogout} setAddEditMode={setAddEditMode} />
        </div>
    )
}