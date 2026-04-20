import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import rateLimit from "express-rate-limit"

import connectDB from "./config/db.js"

import { errorHandler, notFound } from "./middleware/errorMiddleware.js"
import authRoutes from "./routes/authRoutes.js"
import cryptoRoutes from "./routes/cryptoRoutes.js"
import userRoutes from "./routes/userRoutes.js"

dotenv.config()

const app = express()
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many requests, please try again later." }
})

app.use(cors())
app.use(helmet())
app.use(limiter)
app.use(express.json({ limit: "10kb" }))

app.get("/api", (req, res) => {
    res.send("Coinbase API Running")
})

// routes
app.use("/api/auth", authRoutes)
app.use("/api/crypto", cryptoRoutes)
app.use("/api/user", userRoutes)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const startServer = async () => {
    try {
        await connectDB()

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (err) {
        console.error("Failed to start server:", err.message)
        process.exit(1)
    }
}

startServer()
