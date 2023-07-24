import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import commonRoutes from "./app/routes";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middleWares/globalErrorHandler";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(cors());
app.use(cookieParser()); // cookie parser dt

app.use(express.json()); //parser
app.use(express.urlencoded({ extended: true }));

//aplication routes
app.use("/api/v1/", commonRoutes);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API not found",
    errorMassages: [
      {
        path: req.originalUrl,
        message: "API not found",
      },
    ],
  });
  next();
});

export default app;
