import { Link } from "react-router-dom";
import { loginUserInfoKey } from "../../localStorageKeys/index";

export function Footer() {
    const userInfo = JSON.parse(localStorage.getItem(loginUserInfoKey));

    return (
        <footer className="bg-dark text-light py-4 mt-5">
            <div className="container">

                <div className="row align-items-center">

                    {/* <!-- Logo --> */}
                    <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
                        <h4 className="fw-bold">We serve advance courses</h4>
                        <small className="">Learn. Grow. Succeed.</small>
                    </div>

                    {/* <!-- Links --> */}
                    <div className="col-md-4 text-center mb-3 mb-md-0">
                        <Link to="/courses" className="text-light text-decoration-none mx-2">Courses</Link>
                        <Link to={`/user/${userInfo.id}/subscriptions`} className="text-light text-decoration-none mx-2">Subscriptions</Link>
                    </div>

                    {/* <!-- Copyright --> */}
                    <div className="col-md-4 text-center text-md-end">
                        <small className="">2025 Courses. All rights reserved.</small>
                    </div>

                </div>

            </div>
        </footer>
    )
};