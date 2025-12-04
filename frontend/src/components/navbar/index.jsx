import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginUserInfoKey } from "../../localStorageKeys";
import { logoutUser } from "../../redux/auth/authSlice";

export function Navbar({ showNavButtons = true }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem(loginUserInfoKey));

    const handleLogout = () => {
        dispatch(logoutUser());
    }

    return (
        <nav className="bg-light px-3 shadow-sm d-flex justify-content-between align-items-center">
            <img
                src="https://static.vecteezy.com/system/resources/previews/013/061/243/non_2x/tennis-training-logo-design-template-tennis-and-graduate-hat-logo-combination-game-and-study-symbol-or-icon-vector.jpg"
                alt="Logo"
                height="60"
                className="me-2"
                onClick={() => navigate("/courses")}
                style={{ cursor: "pointer" }}
            />

            {showNavButtons && <div className="d-flex gap-2">
                <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate(`/user/${userInfo.id}/subscriptions`)}>My courses</button>
                <button type="button" className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Logout</button>
            </div>}
        </nav>
    )
};