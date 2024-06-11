import cookieParser from "cookie-parser";
import express, { json, static as static_, urlencoded } from "express";
import createError from "http-errors";
import logger from "morgan";
import path, { join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import indexRouter from "./routes/index.js";

const app = express();

// view engine setup
app.set("views", join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(static_(join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        data: null,
        info: {
            status: err.status,
            message: err.message,
        },
    });
});

export default app;
