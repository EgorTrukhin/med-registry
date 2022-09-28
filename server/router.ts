import {testRouter} from "./routes/testRouter";

import express = require("express");

export const router = express.Router();

router.use("/api/test", testRouter);
