import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.js"

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const exists = await User.findOne({ email })
        if (exists) return res.status(400).json({ message: "User exists" })

        const hashed = await bcrypt.hash(password, 10)

        const user = await User.create({ name, email, password: hashed })

        res.status(201).json({
            user,
            token: generateToken(user._id)
        })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: "Invalid credentials" })

        const match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(400).json({ message: "Invalid credentials" })

        res.json({
            user,
            token: generateToken(user._id)
        })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}