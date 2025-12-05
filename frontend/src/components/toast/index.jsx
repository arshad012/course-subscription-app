
export function MyToast({ heading = "", body = "", className = ""}) {
    return (
        <div className={`toast-container p-3 ${className}`} style={{ zIndex: 9999 }}>
            <div
                id="successToast"
                className="toast border-0 success-toast"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                <div className="toast-header bg-success text-white">
                    <strong className="me-auto">{heading}</strong>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="toast"></button>
                </div>
                <div className="toast-body">
                    {body}
                </div>
            </div>
        </div>
    )
};