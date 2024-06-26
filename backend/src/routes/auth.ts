
import express from "express";
import { validate } from "../middlewares";
import { joinSchema } from "../schema-validations";

import { registerOrLogin } from "./../controllers/auth";

const router = express.Router();

router.post("/join", validate(joinSchema), registerOrLogin);

export { router };
