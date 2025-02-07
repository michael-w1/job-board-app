import { useNavigate } from "react-router-dom";
import { UserInfoProps } from "../types";
import { useAuth0 } from "@auth0/auth0-react";

export default function UserInfo({ userInfo, onLogout, setAddEditMode }) {
    const navigate = useNavigate();
    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
    return (
        <div className="flex items-center gap-3">

            {isAuthenticated ? (<>
                <button className="btn btn-neutral" onClick={() => setAddEditMode("add")}> Post Job</button>
                <p className="text-sm font-medium"> {userInfo?.email} </p>

                <button className="text-sm" onClick={async () =>  { await logout({ logoutParams: { returnTo: window.location.origin } }) }}>
                    Sign Out
                </button>
            </>)
                : (<button className="text-sm" onClick={async () => await loginWithRedirect()}>
                    Sign Up/Sign In
                </button>)}

        </div>
    )

}