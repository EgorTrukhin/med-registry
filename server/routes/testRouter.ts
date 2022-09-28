import express = require("express");

export const testRouter = express.Router();

testRouter.get('/', async (req, res) => {
    return res.json({response: "test"});
})
