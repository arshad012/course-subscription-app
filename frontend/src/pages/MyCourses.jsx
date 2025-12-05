import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { BASE_URL } from "../base_url";
import { loginUserInfoKey, loginUserTokenKey } from "../localStorageKeys";
import { getTime } from "../utils/getTime";
import { logoutUser } from "../redux/auth/authSlice";

export function MyCourses() {
    const [data, setData] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    const [courseType, setCourseType] = useState(searchParams.get("course-type") || "All");

    const { userId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!searchParams.get("course-type")) {
            setSearchParams({ "course-type": "All" });
        }

        async function fetchSubscribedCourses(courseType) {
            try {
                const response = await axios.get(`${BASE_URL}/api/my-courses?userId=${userId}&courseType=${courseType}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // console.log('response:', response.data);
                setData(response.data.data);
            } catch (error) {
                console.log('error:', error.response);
                if (error.response.data?.authenticationFailed) dispatch(logoutUser());
            }
        }

        fetchSubscribedCourses(courseType);
    }, [courseType]);

    const userInfo = JSON.parse(localStorage.getItem(loginUserInfoKey));
    const token = localStorage.getItem(loginUserTokenKey);


    const handleUnsubscribe = async (courseId) => {
        try {
            const response = await axios.patch(`${BASE_URL}/api/unsubscribe?userId=${userId}&courseId=${courseId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log('response:', response.data);
            setData(response.data.data);
        } catch (error) {
            console.log('error:', error.response);
            if (error.response.data?.authenticationFailed) dispatch(logoutUser());
        }
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setCourseType(value);
        setSearchParams({ "course-type": value });
    }

    const filterOptions = [
        { value: "All", label: "All Courses" },
        { value: "Paid", label: "Paid Courses" },
        { value: "Free", label: "Free Courses" }
    ];

    return (
        <div className="container my-5">

            {/* User Details */}
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <h4 className="card-title mb-2">Your Profile</h4>
                    <p className="mb-1">Name:<strong> {userInfo?.name}</strong></p>
                    <p className="mb-1">Email:<strong> {userInfo?.email}</strong></p>
                    <p className="text-muted mb-0">
                        {courseType == "All" ? "Total Subscribed Courses: " : courseType == "Free" ? "Free Courses: " : "Paid Courses: "}
                        <strong>{data?.subscriptions?.length}</strong>
                    </p>
                </div>
            </div>

            {/* Courses List */}
            <div className="d-flex justify-content-end gap-3">
                <select className="form-select size-sm" aria-label="Default select example" style={{ width: "150px" }} onChange={handleChange}>
                    {filterOptions.map((opt, i) => (
                        <option key={i} value={opt.value} selected={opt.value == courseType}>{opt.label}</option>
                    ))}
                </select>

                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/courses")}
                >
                    Explore more courses
                </button>
            </div>

            <h4 className="my-3">Subscribed Courses</h4>

            <div className="row g-4">
                {data?.subscriptions?.length > 0 ? (
                    data?.subscriptions.map((course, index) => (
                        <div className="col-md-4" key={course._id || index}>
                            <div className="card h-100 shadow-sm">

                                <div className="card-body d-flex flex-column">
                                    <div className="d-flex flex-md-column flex-lg-row justify-content-between">
                                        <h5 className="card-title">{course.title}</h5>
                                        <img
                                            src={course.image}
                                            alt="logo"
                                            className="rounded-2"
                                            style={{ height: "60px", objectFit: "cover" }}
                                        />
                                    </div>
                                    <p className="card-text text-muted">
                                        {course.description?.substring(0, 100)}...
                                    </p>
                                    <p className={`card-text ${course.isFree ? "badge bg-success text-white" : ""}`} style={{ width: "fit-content" }}>
                                        {course.price > 0 ? `Price paid ₹${course.price / 2}` : "Free"}
                                    </p>
                                    <p className="card-text text-muted">
                                        Subscribed on - {getTime(course.createdAt)}
                                    </p>

                                    <div className="mt-auto d-flex justify-content-end">
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => handleUnsubscribe(course._id)}
                                        >
                                            Unsubscribe
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-muted">You have not subscribed to any courses yet.</p>
                )}
            </div>
        </div>
    )
};