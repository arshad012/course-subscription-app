import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { isEmailValid } from '../validator/index';
import { BASE_URL } from "../base_url";
import { loginUserTokenKey, loginUserInfoKey } from "../localStorageKeys/index";
import { authSelector } from "../redux/auth/selector";
import { loginUser } from "../redux/auth/authSlice";

export function UserLogin({ hideNavButtons }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({ password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const { user, token } = useSelector(authSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        hideNavButtons(false);

        return () => hideNavButtons(true);
    }, []);

    useEffect(() => {
        if (token) {
            navigate("/courses");
        }
    }, [token]);

    const validateInputFields = () => {
        const tempErrors = {};
        if (!isEmailValid(formData.email)) {
            tempErrors.email = "Invalid email";
        };
        if (!formData.password) {
            tempErrors.password = "Please enter password";
        }

        return tempErrors;
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tempErrors = validateInputFields();
        const keys = Object.keys(tempErrors).length;
        if (keys != 0) {
            setErrors(tempErrors);
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, formData);
            // console.log('response:', response.data);

            localStorage.setItem(loginUserTokenKey, response.data.token);
            localStorage.setItem(loginUserInfoKey, JSON.stringify(response.data.data));
            dispatch(loginUser({
                user: response.data.data,
                token: response.data.token
            }))

        } catch (error) {
            console.log('error:', error);
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-start vh-100">
            <div className="card shadow p-4 mt-5" style={{ width: "380px" }}>
                <h3 className="text-center mb-4">Log-in your account</h3>

                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="mb-3">
                        <label className="form-label">Email Address <span className="text-danger">*</span></label>
                        <input
                            type="email"
                            className={`form-control ${errors?.email ? "is-invalid" : ""}`}
                            placeholder="Enter your email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <p className="invalid-feedback">{errors?.email}</p>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="form-label">Password <span className="text-danger">*</span></label>
                        <div className="d-flex align-items-center gap-2">
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`form-control ${errors?.password ? "is-invalid" : ""}`}
                                placeholder="Enter password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {showPassword ? (
                                <i class="bi bi-eye-slash" style={{cursor: "pointer"}} onClick={() => setShowPassword(prev => !prev)}></i>
                            ) : (
                                <i class="bi bi-eye" style={{cursor: "pointer"}} onClick={() => setShowPassword(prev => !prev)}></i>
                            )}
                        </div>
                        {/* <p className="invalid-feedback">{errors?.password}</p> */}
                    </div>
                    <p className="text-danger text-sm" style={{fontSize: "14px"}}>{errors?.password}</p>

                    {/* Button */}
                    <button className="btn btn-primary w-100 mt-2">
                        Log In
                    </button>
                </form>

                <p className="text-center mt-3 mb-0">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-decoration-none">
                        Register now
                    </Link>
                </p>
            </div>
        </div>
    );
};