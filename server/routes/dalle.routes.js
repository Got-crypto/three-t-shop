import * as dotenv from "dotenv";
import express from "express";

dotenv.config()

const router = express.Router()

router.route('/').get((req, res) => {
    res.status(200).json({message: "Hello from DALL.E ROUTES"})
})

export default router