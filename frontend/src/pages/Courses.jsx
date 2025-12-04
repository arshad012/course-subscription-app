import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../base_url";
import { CourseCard } from "../components/courseCard";
import { loginUserTokenKey } from "../localStorageKeys/index";
import { logoutUser } from "../redux/auth/authSlice";
import { useDispatch } from "react-redux";

export function Courses() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = localStorage.getItem(loginUserTokenKey);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await axios.get(`${BASE_URL}/api/courses`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // console.log('response:', response.data);
                setCourses(response.data.data);
            } catch (error) {
                console.log('error:', error.response.data);
                if(error.response.data?.authenticationFailed) dispatch(logoutUser());

                // let message = jwtErrorDecoder(error.response.data?.message);
                // if(!message) {
                //     message = "Unknown server error:" + error.response.data;
                // }
            }
        }

        fetchCourses();
    }, []);

    const handleCourseView = (id) => {
        navigate(`/courses/${id}`);
    }

    return (
        <div className="container-sm my-4">
            <h2 className="mb-4 text-center fw-bold">Available Courses</h2>
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
    );
};