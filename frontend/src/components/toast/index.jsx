
export function MyToast() {
    return (
        <div className="toast-container position-fixed bottom-0 start-0 p-3" style={{ zIndex: 9999 }}>
            <div
                id="successToast"
                className="toast border-0 success-toast"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                <div className="toast-header bg-success text-white">
                    <strong className="me-auto">Promo code applied</strong>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="toast"></button>
                </div>
                <div className="toast-body">
                    Congratulations, you got 50% discount
                </div>
            </div>
        </div>
    )
};