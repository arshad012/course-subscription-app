import { loginUserInfoKey } from "../../localStorageKeys/index";

export function MyModal({ modalRef, message="" }) {
    const userInfo = JSON.parse(localStorage.getItem(loginUserInfoKey));

    return (
        <div
            className="modal fade"
            id="myModal"
            tabIndex="-1"
            aria-hidden="true"
            ref={modalRef}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Hi {userInfo?.name}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                        ></button>
                    </div>

                    <div className="modal-body">
                        {message}
                    </div>

                </div>
            </div>
        </div>
    );
};