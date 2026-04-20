import Crypto from "../models/crypto.js"

export const getAll = async (req, res) => {
    res.json(await Crypto.find())
}

export const getGainers = async (req, res) => {
    res.json(await Crypto.find().sort({ change24h: -1 }))
}

export const getNew = async (req, res) => {
    res.json(await Crypto.find().sort({ createdAt: -1 }))
}

export const addCrypto = async (req, res) => {
    try {
        const crypto = await Crypto.create(req.body)
        res.status(201).json(crypto)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}