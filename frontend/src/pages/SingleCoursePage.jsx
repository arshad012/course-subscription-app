import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as bootstrap from "bootstrap";
import { useDispatch } from "react-redux";

import { BASE_URL } from "../base_url";
import { MyToast } from "../components/toast";
import { loginUserInfoKey, loginUserTokenKey } from "../localStorageKeys/index";
import { MyModal } from "../components/modal";
import { logoutUser } from "../redux/auth/authSlice";

export const SingleCoursePage = () => {
    const { courseId } = useParams();
    const [pageDetails, setPageDetails] = useState({
        course: {},
        promocodeError: "",
        input: "",
        modalMessage: ""
    });
    const [disabled, setDisabled] = useState({
        applyBtn: false,
        subscribeBtn: true,
        input: false
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchCourse(id) {
            try {
                const response = await axios.get(`${BASE_URL}/api/courses/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPageDetails({ ...pageDetails, ["course"]: response.data.course });
            } catch (error) {
                console.log('error:', error.response);
                if(error.response.data?.authenticationFailed) dispatch(logoutUser());
            }
        }

        fetchCourse(courseId);
    }, []);

    const modalRef = useRef(null);
    const bootstrapModalRef = useRef(null);

    useEffect(() => {
        const modalEl = modalRef.current;

        // Create modal instance only ONCE
        bootstrapModalRef.current = new bootstrap.Modal(modalEl, {
            backdrop: true,
            keyboard: true
        });

        // Cleanup when component unmounts
        return () => {
            bootstrapModalRef.current.hide();
        };
    }, []);

    const userInfo = JSON.parse(localStorage.getItem(loginUserInfoKey));
    const token = localStorage.getItem(loginUserTokenKey);

    const showToast = () => {
        const toastEl = document.getElementById("successToast");
        if (!toastEl) return;

        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    };

    const handleApplyPromocode = () => {
        if (pageDetails.input === 'BFSALE25') {
            setPageDetails({ ...pageDetails, ["promocodeError"]: "" })
            setDisabled({ ...disabled, ["applyBtn"]: true, ["input"]: true, ["subscribeBtn"]: false })
            setPageDetails({ ...pageDetails, ["course"]: { ...pageDetails.course, ["price"]: pageDetails.course.price / 2 } });
            showToast();
        } else {
            setPageDetails({ ...pageDetails, ["promocodeError"]: "Invalid promo code" })
        }
    };

    const handleSubscribe = async () => {
        try {
            const response = await axios.patch(`${BASE_URL}/api/subscribe`, {
                userId: userInfo.id,
                course: pageDetails.course
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // console.log('response:', response);
            setPageDetails({ ...pageDetails, ["modalMessage"]: `You have successfully subscribed to ${pageDetails?.course?.title} course, please wait we will redirect you to your course pages` });
            bootstrapModalRef.current.show();

            setTimeout(() => {
                navigate(`/user/${userInfo.id}/subscriptions`);
            }, 5000);

        } catch (error) {
            if(error.response.data?.authenticationFailed) {dispatch(logoutUser())}
            else {
                console.log('error:', error.response.data);
                setPageDetails({ ...pageDetails, ["modalMessage"]: error.response.data.message });
                bootstrapModalRef.current.show();
            } 
        }
    };


    return (
        <div className="container mt-5 mb-5">
            <MyToast 
                heading="Promo code applied" 
                body="Congratulations, you got 50% discount" 
                className="position-fixed bottom-0 start-0"
            />
            <MyModal modalRef={modalRef} message={pageDetails.modalMessage} />

            {/* Back Button */}
            <button className="btn btn-primary mb-4 sm-btn-sm" onClick={() => navigate("/courses")}>
                ← Back to Courses
            </button>

            <div className="card bg-dark text-white shadow-lg p-4">

                {/* pageDetails.Course Image */}
                <img
                    src={pageDetails.course.image}
                    alt={pageDetails.course.title}
                    className="img-fluid rounded mb-4"
                    style={{ height: "350px", width: "100%", objectFit: "cover" }}
                />

                {/* Title & Description */}
                <h2 className="mb-3">{pageDetails.course.title}</h2>

                <p className="text-light-50 fs-5">{pageDetails.course.description}</p>

                <hr className="border-secondary" />

                {/* Price Section */}
                <h4 className="mt-3">
                    {pageDetails.course.isFree ? (
                        <span className="badge bg-success fs-6">FREE</span>
                    ) : (
                        <span className="text-warning fw-bold">₹{pageDetails.course.price}</span>
                    )}
                </h4>

                {!pageDetails.course?.isFree &&
                    <div className="mb-3" style={{ maxWidth: "350px" }}>
                        <label className="form-label">{disabled.subscribeBtn ? "Use Promo code \"BFSALE25\"" : "Promo code applied successfully"}</label>
                        <div className="d-flex align-items-center gap-2">
                            <input
                                type="text"
                                className={`form-control ${pageDetails.promocodeError ? "is-invalid" : ""}`}
                                placeholder="Enter promo code"
                                value={pageDetails.input}
                                onChange={(e) => setPageDetails({ ...pageDetails, ["input"]: e.target.value, ["promocodeError"]: "" })}
                                disabled={disabled.input}
                            />
                            <button disabled={disabled.applyBtn} type="button" className="btn btn-primary btn-sm text-nowrap" onClick={handleApplyPromocode}>Apply</button>
                        </div>

                        <p className="text-danger">{pageDetails.promocodeError}</p>
                    </div>}

                {/* Subscribe Button */}
                <button disabled={disabled.subscribeBtn && !pageDetails?.course?.isFree} className="btn btn-primary btn-lg mt-4 w-100" onClick={handleSubscribe}>
                    Subscribe Now
                </button>
            </div>
        </div>
    );
};
