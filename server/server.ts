import {router} from "./router";

import express = require("express");
import config = require("config");
import cors = require("cors");
import database = require("nedb");

const PORT = config.get("serverPort");

// @ts-ignore
(async () => {
    const app = express();
    try {
        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        // app.use(express.static(`${ROOT_PATH}/client/build`));
        app.disable('x-powered-by');
        app.use("/", router);

        app.listen(PORT, () => {
            console.log("Server started on port ", PORT);
        });
    } catch (e) {

    }
})();