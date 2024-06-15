import "dotenv/config";
import jwt from "jsonwebtoken";
import userService from "../services/user.service.js";

const list = async (req, res, next) => {
    try {
        const result = await userService.list(req.query);

        res.status(200).json({
            data: result,
            info: {
                status: 200,
                message: "OK",
            },
        });
    } catch (error) {
        next(error);
    }
};

const read = async (req, res, next) => {
    try {
        const result = await userService.read(req.params);

        res.status(200).json({
            data: result,
            info: {
                status: 200,
                message: "OK",
            },
        });
    } catch (error) {
        next(error);
    }
};

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body);

        res.status(201).json({
            data: null,
            info: {
                status: 201,
                message: "Created",
            },
        });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const result = await userService.update(req.params, req.body);

        res.status(200).json({
            data: result,
            info: {
                status: 200,
                message: "OK",
            },
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        const accessToken = jwt.sign(result, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        const refreshToken = jwt.sign(result, process.env.JWT_SECRET_KEY, { expiresIn: "2h" });

        res.cookie("refresh-token", refreshToken, {
            maxAge: 2000 * 60 * 60,
            httpOnly: true,
            signed: true, // parsing token
            secure: process.env.NODE_ENV === "production", // Only use https
        });

        res.status(200).json({
            data: { ...result, token: accessToken },
            info: {
                status: 200,
                message: "OK",
            },
        });
    } catch (error) {
        next(error);
    }
};

export default { list, login, read, register, update };
