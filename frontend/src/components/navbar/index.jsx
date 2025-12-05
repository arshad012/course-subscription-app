import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loginUserInfoKey } from "../../localStorageKeys";
import { logoutUser } from "../../redux/auth/authSlice";

export function Navbar({ showLogoutBtn = true, showMyCourseBtn = true }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = JSON.parse(localStorage.getItem(loginUserInfoKey));

    const handleLogout = () => {
        dispatch(logoutUser());
    }

    const handleClick = () => {
        const current_url = window.location.href;
        let end = current_url.split("/");
        end = end[end.length-1];
        if(end == "" || end == "signup") {
            return;
        }
        else {
            navigate("/courses");
        }
    };

    return (
        <nav className="bg-light px-3 shadow-sm d-flex justify-content-between align-items-center">
            <img
                src="https://static.vecteezy.com/system/resources/previews/013/061/243/non_2x/tennis-training-logo-design-template-tennis-and-graduate-hat-logo-combination-game-and-study-symbol-or-icon-vector.jpg"
                alt="Logo"
                height="60"
                className="me-2"
                onClick={handleClick}
                style={{ cursor: "pointer" }}
            />

            <div className="d-flex gap-2">
                {showMyCourseBtn && <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate(`/user/${userInfo.id}/subscriptions`)}>My courses</button>}
                {showLogoutBtn && <button type="button" className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Logout</button>}
            </div>
        </nav>
    )
};