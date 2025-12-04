import { useNavigate } from "react-router-dom";

export function NotFound() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/courses", { replace: true });
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-start" style={{ height: "100vh", textAlign: "center" }}>
            <h1 className="mt-5" style={{ "fontSize": "100px", "fontWeight": 700, color: "#4a5568" }}>404</h1>
            <p style={{ fontSize: "20px", color: "#718096" }}>Oops! The page you're looking for doesn't exist.</p>

            <button className="btn btn-primary mt-3 px-4 py-2" onClick={handleClick}>Go Home</button>
        </div>
    )
};