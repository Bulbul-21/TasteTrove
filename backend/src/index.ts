/*
 * @file app.ts
 * @description This file sets up and configures an Express.js server with
 * various middleware and routing functionalities.
 * It connects to a MongoDB database, configures authentication, handles file
 *  uploads, and sets up routes for authentication and recipes.
 *
 * The main functionalities include:
 * - Connecting to MongoDB using Mongoose.
 * - Setting up middleware for JSON parsing, URL encoding, CORS, security, and
 * file uploads.
 * - Initializing Passport.js for authentication.
 * - Defining routes for authentication and recipe-related operations.
 * - Health check endpoint.
 * - Catch-all route for handling undefined routes.
 * @requires dotenv - Loads environment variables from a .env file.
 * @requires express - The Express.js framework.
 * @requires mongoose - Mongoose for MongoDB object modeling.
 * @requires passport - Passport.js for authentication.
 * @requires cors - Middleware for enabling Cross-Origin Resource Sharing.
 * @requires express-fileupload - Middleware for handling file uploads.
 * @requires helmet - Middleware for securing Express apps by setting various
 *                     HTTP headers.
 * @requires ./routes - Custom route handlers for authentication and recipe
 * endpoints.
 * @requires ./config - Configuration for Passport.js authentication.
 * @module app
 */

// Import dependencies
import * as dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response } from "express";
import { connect } from "mongoose";
import passport from "passport";
import cors from "cors";
import fileUpload from "express-fileupload";
import helmet from "helmet";
import { authRouter, recipeRouter } from "./routes";
import { authenticate } from "./config";


const app: Application = express();
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(helmet());

// Middleware to handle file uploads with a limit of 50MB
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    abortOnLimit: true,
  })
);

app.use(passport.initialize());

// Passport Config
authenticate(passport);

//initialize DB call
/*
 * Connect to MongoDB database.
 * Logs a message indicating whether the connection was successful or not.
 */
const runDB = async () => {
  connect(process.env.MONGODB_URI as string)
    .then(() => console.log("DB connected successfully"))
    .catch(() => console.log("DB not connected"));
};

//start DB
runDB();

app.use("/recipe", recipeRouter);
app.use("/auth", authRouter);

//OPTIONAL (THIS IS JUST FOR HEALTH CHECK MAJORLY)
//added for pinging and health check on render.com
app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});
app.all("*", async (req: Request, res: Response) => {
  console.log(req.protocol);
  res.status(404).json({
    error: "The route you requested is not found",
  });
});

const PORT = (process.env.PORT as unknown as number) || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
