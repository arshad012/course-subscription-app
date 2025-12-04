export const jwtErrorDecoder = (message) => {
    let decoded = "";

    if (message === "Authorization header missing") {
        decoded = "No token found. Please login.";
    }
    else if (message === "Invalid authorization format") {
        decoded = "Invalid token format received.";
    }
    else if (message === "Token not provided") {
        decoded = "Token missing.";
    }
    else if (message === "Token expired") {
        decoded = "Token expired. Redirecting to login...";
        // localStorage.removeItem("token");
        // navigate("/login");
    }
    else if (message === "Invalid token") {
        decoded = "Invalid token. Redirecting to login...";
        // localStorage.removeItem("token");
        // navigate("/login");
    }
    else if (message === "Token not active yet") {
        decoded = "Token not active yet.";
    }
    else if (message === "Unauthorized access") {
        decoded = "Unauthorized attempt.";
    }

    return decoded;
};