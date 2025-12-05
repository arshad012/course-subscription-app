import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

import { BASE_URL } from "../base_url";
import { CourseCard } from "../components/courseCard";
import { loginUserTokenKey } from "../localStorageKeys/index";
import { logoutUser } from "../redux/auth/authSlice";
import { useDispatch } from "react-redux";
import { Loading } from "../components/Loading";
import { Footer } from "../components/Footer";

export function Courses() {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [courseType, setCourseType] = useState(searchParams.get("course-type") || "All");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = localStorage.getItem(loginUserTokenKey);

    useEffect(() => {
        if (!searchParams.get("course-type")) {
            setSearchParams({ "course-type": "All" });
        }
        async function fetchCourses(courseType) {
            try {
                const response = await axios.get(`${BASE_URL}/api/courses?courseType=${courseType}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // console.log('response:', response.data);
                setCourses(response.data.data);
            } catch (error) {
                console.log('error:', error.response.data);
                if (error.response.data?.authenticationFailed) dispatch(logoutUser());
            } finally {
                setIsLoading(false);
            }
        }

        fetchCourses(courseType);
    }, [courseType]);

    const handleChange = (e) => {
        const value = e.target.value;
        setCourseType(value);
        setSearchParams({ "course-type": value });
    }

    const handleCourseView = (id) => {
        navigate(`/courses/${id}`);
    }

    const filterOptions = [
        { value: "All", label: "All Courses" },
        { value: "Paid", label: "Paid Courses" },
        { value: "Free", label: "Free Courses" }
    ];


    return ( isLoading ? <Loading /> :
        <div>
            <div className="container-sm my-4">
                <select className="form-select size-sm" aria-label="Default select example" style={{ width: "150px" }} onChange={handleChange}>
                    {filterOptions.map((opt, i) => (
                        <option key={i} value={opt.value} selected={opt.value == courseType}>{opt.label}</option>
                    ))}
                </select>

                <h2 className="mb-4 mt-2 text-center fw-bold">Available Courses</h2>
                <div className="container mt-4">
                    <div className="row g-4">
                        {courses.map(course => (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={course._id}>
                                <CourseCard
                                    title={course.title}
                                    description={course.description}
                                    image={course.image}
                                    price={course.price}
                                    isFree={course.isFree}
                                    onView={() => handleCourseView(course._id)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};