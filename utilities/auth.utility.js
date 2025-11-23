import jwt from "jsonwebtoken";

export const getJWTToken = (tokenData) => {
    return jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

// export const verifyJWTToken = (token) => {
//     return jwt.verify(token, process.env.JWT_SECRET);
// };

export const setCookie = (res, payload) => {
    const defaultOptions = {
        maxAge: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        secure: true,
        sameSite: "None",
    };
    res.cookie("loginToken", payload, defaultOptions);
};

export const clearCookie = (res) => {
    res.clearCookie("loginToken");
    res.clearCookie("userName");
};

export const setUserNameCookie = (res, userName) => {
    const defaultOptions = {
        maxAge: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly: false, // Allow frontend to read this cookie
        secure: true,
        sameSite: "None",
    };
    res.cookie("userName", userName, defaultOptions);
};;