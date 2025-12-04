import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // 1. Check if header exists
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing",
                authenticationFailed: true
            });
        }

        // 2. Must be in "Bearer token" format
        const parts = authHeader.split(" ");
        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return res.status(401).json({
                success: false,
                message: "Invalid authorization format",
                authenticationFailed: true
            });
        }

        const token = parts[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not provided",
                authenticationFailed: true
            });
        }

        // 3. Verify token
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                // Token expired
                if (err.name === "TokenExpiredError") {
                    return res.status(401).json({
                        success: false,
                        message: "Token expired",
                        authenticationFailed: true
                    });
                }

                // Token is not valid
                if (err.name === "JsonWebTokenError") {
                    return res.status(401).json({
                        success: false,
                        message: "Invalid token",
                        authenticationFailed: true
                    });
                }

                // Token used before nbf time
                if (err.name === "NotBeforeError") {
                    return res.status(401).json({
                        success: false,
                        message: "Token not active yet",
                        authenticationFailed: true
                    });
                }

                // Unknown JWT error
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized access",
                    authenticationFailed: true
                });
            }

            // 4. Attach user ID to request
            req.userId = decoded.id;
            next();
        });

    } catch (error) {
        // Server crash prevention
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



/*
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        const headers = req.headers.authorization;
        if(!headers) {
            return res.status(401).json({
                success: false,
                message: "unauthorized"
            })
        };

        const token = headers.split(" ")[1];
        if(!token) {
            return res.status(401).json({
                success: false,
                message: "unauthorized"
            })
        };

        const claims = jwt.verify(token,  process.env.SECRET_KEY);
        req.userId = claims.id;

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
    
};
*/