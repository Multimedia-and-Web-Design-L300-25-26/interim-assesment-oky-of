import mongoose from "mongoose"

const cryptoSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true
    },
    symbol: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    change24h: {
        type: Number,
        required: true
    }
},
{ timestamps: true }
)

export default mongoose.model("Crypto", cryptoSchema)
