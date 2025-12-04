import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { isEmailValid, isPasswordValid } from '../validator/index';
import { BASE_URL } from "../base_url";

export function UserSignup({ hideNavButtons }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false
    });
    const navigate = useNavigate();

    useEffect(() => hideNavButtons(false), []);

    const validateInputFields = () => {
        const tempErrors = {};
        if(!isEmailValid(formData.email)) {
            tempErrors.email = "Invalid email";
        };
        if(!isPasswordValid(formData.password)) {
            tempErrors.password = "Invalid password";
        };
        if(formData.password != formData.confirmPassword) {
            tempErrors.confirmPassword = "Password does not match";
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
        if(keys != 0) {
            setErrors(tempErrors);
            return;
        }
        
        const dataToSend = { ...formData };
        delete dataToSend.confirmPassword;

        try {
            const res = await axios.post(`${BASE_URL}/auth/signup`, dataToSend);
            // console.log('res:', res);
            navigate("/");
            
        } catch (error) {
            console.log('error:', error);
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-start vh-100">
            <div className="card shadow p-4 mt-5" style={{ width: "380px" }}>
                <h3 className="text-center mb-4">Create Account</h3>

                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

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
                                type={showPassword.password ? "text" : "password"}
                                className={`form-control ${errors?.password ? "is-invalid" : ""}`}
                                placeholder="Enter password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {showPassword.password ? (
                                <i class="bi bi-eye-slash" style={{cursor: "pointer"}} onClick={() => setShowPassword({...showPassword, ["password"]: !showPassword.password})}></i>
                            ) : (
                                <i class="bi bi-eye" style={{cursor: "pointer"}} onClick={() => setShowPassword({...showPassword, ["password"]: !showPassword.password})}></i>
                            )}
                        </div>
                        {/* <p className="invalid-feedback">{errors?.password}</p> */}
                    </div>
                    <p className="text-danger text-sm m-0" style={{fontSize: "14px"}}>{errors?.password}</p>
                    {errors.password && 
                    <div>
                        <p className="text-danger text-sm" style={{fontSize: "14px"}}>Password should have atleast one digit, one capital and small letter</p>
                        <p className="text-danger text-sm" style={{fontSize: "14px"}}>Atleast one special character among @  #  $  %  &  *</p>
                    </div>
                    }

                    {/* Confirm Password */}
                    <div className="my-3">
                        <label className="form-label">Confirm password <span className="text-danger">*</span></label>
                        <div className="d-flex align-items-center gap-2">
                            <input
                                type={showPassword.confirmPassword ? "text" : "password"}
                                className={`form-control ${errors?.confirmPassword ? "is-invalid" : ""}`}
                                placeholder="Confirm password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            {showPassword.confirmPassword ? (
                                <i class="bi bi-eye-slash" style={{cursor: "pointer"}} onClick={() => setShowPassword({...showPassword, ["confirmPassword"]: !showPassword.confirmPassword})}></i>
                            ) : (
                                <i class="bi bi-eye" style={{cursor: "pointer"}} onClick={() => setShowPassword({...showPassword, ["confirmPassword"]: !showPassword.confirmPassword})}></i>
                            )}
                        </div>
                        {/* <p className="invalid-feedback">{errors?.confirmPassword}</p> */}
                    </div>
                    <p className="text-danger text-sm" style={{fontSize: "14px"}}>{errors?.confirmPassword}</p>

                    {/* Button */}
                    <button className="btn btn-primary w-100 mt-2">
                        Sign Up
                    </button>
                </form>

                <p className="text-center mt-3 mb-0">
                    Already registered?{" "}
                    <Link to="/" className="text-decoration-none">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
}