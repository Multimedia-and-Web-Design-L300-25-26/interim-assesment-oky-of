import express from "express"
import auth from "../middleware/authMiddleware.js"
import {
    getAll,
    getGainers,
    getNew,
    addCrypto
} from "../controllers/cryptoController.js"

const router = express.Router()

router.get("/", getAll)
router.get("/gainers", getGainers)
router.get("/new", getNew)
router.post("/", addCrypto)

export default router