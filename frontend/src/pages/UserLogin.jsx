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

export function UserLogin({ handleNavButtons }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { user, token } = useSelector(authSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        handleNavButtons({ showLogoutBtn: false, showMyCourseBtn: false });

        return () => handleNavButtons({ showLogoutBtn: true, showMyCourseBtn: true });
    }, []);

    useEffect(() => {
        if (token) {
            navigate("/courses", { replace: true });
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
    };
    
    const validateInputFieldsOnChange = (name, value) => {
        let error;
        value = value.trim();

        switch(name) {
            case "email" : 
                if (!isEmailValid(value)) {
                    error = "Invalid email";
                }
                break;
            default :
                null;
        };

        setErrors(prev => ({...prev, [name]: error}));
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateInputFieldsOnChange(name, value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tempErrors = validateInputFields();
        const keys = Object.keys(tempErrors).length;
        if (keys != 0) {
            setErrors(tempErrors);
            return;
        }

        setIsLoading(true);
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
            console.log('error:', error.response);
            if (error.response.data.message == "User not found") {
                setErrors({ email: error.response.data.message });
            } else if (error.response.data.message == "Wrong password") {
                setErrors({ password: error.response.data.message });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-start vh-100">
            <div className="card shadow p-4 my-5" style={{ width: "380px" }}>
                <h3 className="text-center">Log-in your account</h3>
                <p className="text-center text-muted mb-4">Enter your credentials</p>

                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="form-floating">
                        <input
                            id="floatingEmail"
                            type="email"
                            className={`form-control ${errors?.email ? "is-invalid" : ""}`}
                            placeholder="Enter your email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <label className="form-label" htmlFor="floatingEmail">Email Address</label>
                        {/* <p className="invalid-feedback">{errors?.email}</p> */}
                    </div>
                    <p className="text-danger text-sm" style={{ fontSize: "14px" }}>{errors?.email}</p>

                    {/* Password */}
                    <div>
                        <div className="input-group form-floating">
                            <input
                                id="floatingPassword"
                                type={showPassword ? "text" : "password"}
                                className={`form-control ${errors?.password ? "is-invalid" : ""}`}
                                placeholder="Enter password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <label className="form-label" htmlFor="floatingPassword">Password</label>
                            {showPassword ? (
                                <i className="bi bi-eye-slash input-group-text" style={{ cursor: "pointer" }} onClick={() => setShowPassword(prev => !prev)}></i>
                            ) : (
                                <i className="bi bi-eye input-group-text" style={{ cursor: "pointer" }} onClick={() => setShowPassword(prev => !prev)}></i>
                            )}
                        </div>
                    </div>
                    {/* <p className="invalid-feedback">{errors?.password}</p> */}
                    <p className="text-danger text-sm" style={{ fontSize: "14px" }}>{errors?.password}</p>

                    {/* Button */}
                    <button className="btn btn-primary w-100 mt-2 d-flex gap-2 justify-content-center align-items-center" type="submit" disabled={isLoading}>
                        {isLoading ? <>
                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                            <span role="status">Plase wait...</span>
                        </> :
                            <span>Log In</span>
                        }
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