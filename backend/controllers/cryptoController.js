import Crypto from "../models/crypto.js"

export const getAll = async (req, res) => {
    const cryptos = await Crypto.find().sort({ name: 1 })
    res.json(cryptos)
}

export const getGainers = async (req, res) => {
    const cryptos = await Crypto.find().sort({ change24h: -1 })
    res.json(cryptos)
}

export const getNew = async (req, res) => {
    const cryptos = await Crypto.find().sort({ createdAt: -1 })
    res.json(cryptos)
}

export const addCrypto = async (req, res) => {
    const { name, symbol, price, image, change24h } = req.body

    if (
        !name ||
        !symbol ||
        price === undefined ||
        !image ||
        change24h === undefined
    ) {
        res.status(400)
        throw new Error("Name, symbol, price, image, and change24h are required")
    }

    const crypto = await Crypto.create({
        name,
        symbol,
        price,
        image,
        change24h
    })

    res.status(201).json(crypto)
}
