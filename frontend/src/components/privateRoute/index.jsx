import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authSelector } from "../../redux/auth/selector";
import { useEffect } from "react";

export function PrivateRoute({ children }) {
    const navigate = useNavigate();
    const { user, token } = useSelector(authSelector);

    useEffect(() => {
        if(!token) {
            return navigate("/");
        }
    }, [token]);

    return children;
}