import Crypto from "../models/crypto.js"

export const getAll = async (req, res) => {
    try {
        const cryptos = await Crypto.find().sort({ name: 1 })
        res.json(cryptos)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const getGainers = async (req, res) => {
    try {
        const cryptos = await Crypto.find().sort({ change24h: -1 })
        res.json(cryptos)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const getNew = async (req, res) => {
    try {
        const cryptos = await Crypto.find().sort({ createdAt: -1 })
        res.json(cryptos)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const addCrypto = async (req, res) => {
    try {
        const { name, symbol, price, image, change24h } = req.body

        if (
            !name ||
            !symbol ||
            price === undefined ||
            !image ||
            change24h === undefined
        ) {
            return res.status(400).json({
                message: "Name, symbol, price, image, and change24h are required"
            })
        }

        const crypto = await Crypto.create({
            name,
            symbol,
            price,
            image,
            change24h
        })

        res.status(201).json(crypto)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
